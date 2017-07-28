import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import io from 'socket.io-client';

class VideoChat extends Component { 
  constructor(props) {	
    super(props);
    
    this.SIGNALING_SERVER = 'http://localhost';
    this.USE_AUDIO = true;
    this.USE_VIDEO = true;
    this.DEFAULT_CHANNEL = 'some-global-channel-name';
    this.MUTE_AUDIO_BY_DEFAULT = false;
  
  componentDidMount() {
    /*UNIQUE CHANNEL FOR EACH GROUP*/
    console.log('shortID', this.props.shortID);
    
    /** CONFIG **/
    var SIGNALING_SERVER = 'http://localhost';
    var USE_AUDIO = true;
    var USE_VIDEO = true;
    var DEFAULT_CHANNEL = 'some-global-channel-name';
    var MUTE_AUDIO_BY_DEFAULT = false;
    /** You should probably use a different stun server doing commercial stuff **/
    /** Also see: https://gist.github.com/zziuni/3741933 **/
    var ICE_SERVERS = [{
      url: 'stun:stun.l.google.com:19302'
    }];
    this.signaling_socket = null;
    this.local_media_stream = null; 
    // peers = {}; 
    this.peer_media_elements = {}; 

    // this.setUpLocalMedia = this.setUpLocalMedia.bind(this);
  }

  componentDidMount() {
    var peers = {};
    console.log('Connecting to signaling server');
    this.signaling_socket = io(this.SIGNALING_SERVER);
    this.signaling_socket = io();
    this.signaling_socket.on('connect', () => {
      console.log('Connected to signaling server');
      setUpLocalMedia(() => {
        join_chat_channel(this.DEFAULT_CHANNEL, {
          'whatever-you-want-here': 'stuff'
        });
      });
    });
    this.signaling_socket.on('disconnect',() => {
      console.log('Disconnected from signaling server');
      for (peer_id in this.peer_media_elements) {
        this.peer_media_elements[peer_id].remove();
      }
      for (peer_id in peers) {
        peers[peer_id].close();
      }
      peers = {};
      this.peer_media_elements = {};
    });
    const join_chat_channel = (channel, userdata) => {
      this.signaling_socket.emit('join', {
        'channel': channel,
        'userdata': userdata
      });
    };
    const part_chat_channel = (channel) => {
      this.signaling_socket.emit('part', channel);
    };

    this.signaling_socket.on('addPeer', function(config) {
      console.log('Signaling server said to add peer:', config);
      var peer_id = config.peer_id;
      if(peers !== undefined) {
        if (peer_id in peers) {
          console.log('Already connected to peer ', peer_id);
          return;
        }
      }
      var peer_connection = new RTCPeerConnection({
        'iceServers': this.ICE_SERVERS
      }, {
        'optional': [{
          'DtlsSrtpKeyAgreement': true
        }]
      });
      // console.log('peer connection',peer_connection);
      console.log('peers[peer_id]', peers);      
      peers[peer_id] = peer_connection;
      peer_connection.onicecandidate = (event) => {
        console.log('FROZEN ON ICE');
        if (event.candidate) {
          this.signaling_socket.emit('relayICECandidate', {
            'peer_id': peer_id,
            'ice_candidate': {
              'sdpMLineIndex': event.candidate.sdpMLineIndex,
              'candidate': event.candidate.candidate
            }
          });
        }
      };

      peer_connection.ontrack = (event) => {
        console.log('ON ADD TRACK');
        var remote_media = USE_VIDEO ? document.createElement('video') : document.createElement('audio');
        remote_media.setAttribute('autoplay', 'autoplay');
        if (MUTE_AUDIO_BY_DEFAULT) {
          remote_media.setAttribute('muted', 'true');
        }
        remote_media.setAttribute('controls', '');
        remote_media.setAttribute('width', '50%');
        this.peer_media_elements[peer_id] = remote_media;
        var video = document.getElementsByClassName('videos');
        console.log(video);
        video.appendChild(remote_media);
        attachMediaStream(remote_media, event.stream);
      };
      console.log('LOCAL MEDIA STREAM: ', this.local_media_stream);
      setUpLocalMedia(peer_connection.addStream, () => {
        console.log('Error adding stream!');
      });
      if (config.should_create_offer) {
        console.log('Creating RTC offer to ', peer_id);
        peer_connection.createOffer(
          (local_description) => {
            console.log('Local offer description is: ', local_description);
            peer_connection.setLocalDescription(local_description,
              () => {
                this.signaling_socket.emit('relaySessionDescription', {
                  'peer_id': peer_id,
                  'session_description': local_description
                });
                console.log('Offer setLocalDescription succeeded');
              },
              () => {
                Alert('Offer setLocalDescription failed!');
              }
            );
          },
          (error) => {
            console.log('Error sending offer: ', error);
          });
      }
    });
    this.signaling_socket.on('sessionDescription', (config) => {
      console.log('Remote description received: ', config);
      var peer_id = config.peer_id;
      var peer = peers[peer_id];
      var remote_description = config.session_description;
      console.log(config.session_description);
      var desc = new RTCSessionDescription(remote_description);
      var stuff = peer.setRemoteDescription(desc,
        () => {
          console.log('setRemoteDescription succeeded');
          if (remote_description.type === 'offer') {
            console.log('Creating answer');
            peer.createAnswer(
              (local_description) => {
                console.log('Answer description is: ', local_description);
                peer.setLocalDescription(local_description,
                  () => {
                    this.signaling_socket.emit('relaySessionDescription', {
                      'peer_id': peer_id,
                      'session_description': local_description
                    });
                    console.log('Answer setLocalDescription succeeded');
                  },
                  () => {
                    Alert('Answer setLocalDescription failed!');
                  }
                );
              },
              (error) => {
                console.log('Error creating answer: ', error);
                console.log(peer);
              });
          }
        },
        (error) => {
          console.log('setRemoteDescription error: ', error);
        }
      );
      console.log('Description Object: ', desc);
    });
    this.signaling_socket.on('iceCandidate', (config) => {
      var peer = peers[config.peer_id];
      var ice_candidate = config.ice_candidate;
      peer.addIceCandidate(new RTCIceCandidate(ice_candidate));
    });
    this.signaling_socket.on('removePeer', (config) => {
      console.log('Signaling server said to remove peer:', config);
      var peer_id = config.peer_id;
      if (peer_id in this.peer_media_elements) {
        this.peer_media_elements[peer_id].remove();
      }
      if (peer_id in peers) {
        peers[peer_id].close();
      }
      delete peers[peer_id];
      delete this.peer_media_elements[config.peer_id];
    });
    /* END INIT */
  
    var setUpLocalMedia = (callback, errorback) => {
      if (this.local_media_stream != null) { /* ie, if we've already been initialized */
        if (callback) {
          callback();
        }
        return;
      }
      console.log('Requesting access to local audio / video inputs');
      navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
      var attachMediaStream = (element, stream) => {
        console.log('DEPRECATED, attachMediaStream will soon be removed.');
        if (element !== undefined) {
          element.srcObject = stream;
        } else {
          console.error('Element undefined!');
          return;
        }
      };
      console.log('Getting user media!...');
      navigator.getUserMedia({
        'audio': this.USE_AUDIO,
        'video': this.USE_VIDEO
      },
      (stream) => { 
        console.log('Access granted to audio/video');
        var local_media_stream = stream;
        var local_media = this.USE_VIDEO ? document.createElement('video') : document.createElement('audio');
        local_media.setAttribute('autoplay', 'autoplay');
        local_media.setAttribute('muted', 'true'); 
        local_media.setAttribute('controls', '');
        local_media.setAttribute('width', '50%');
        var video = document.getElementsByClassName('videos');
        video[0].appendChild(local_media);
        attachMediaStream(local_media, stream);
        if (callback) {
          callback();
        } 
      },
      () => { 
        console.log('Access denied for audio/video');
        alert('You chose not to provide access to the camera/microphone, demo will not work.');
        if (errorback) {
          errorback();
        }
      });
    };
  }
  render () {
    return (
      <div className='videos'></div>
    );
  }
}

export default VideoChat;