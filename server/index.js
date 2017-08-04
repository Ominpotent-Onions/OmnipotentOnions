'use strict';
const app = require('./app');
const db = require('../db');

const PORT = process.env.PORT || 3000;  
// Might wanna change ^^^^^ to config.port, but then you must require('config')

// const twilioConfig = require('../config/twilio');
// const accountSid = twilioConfig.accountSid;
// const authToken = twilioConfig.authToken;

// var twilio = require('twilio')(accountSid, authToken);
// console.log(process.env.ACCOUNT_SID);

const server = app.listen(PORT, () => {
  console.log(`connectHere app listening on port ${PORT}!`);
});

const io = require('socket.io').listen(server);

io.attach(server);
io.set('transports', ['websocket', 'htmlfile', 'polling']);

var channels = {};
var sockets = {};

/**
 * Users will connect to the signaling server, after which they'll issue a "join"
 * to join a particular channel. The signaling server keeps track of all sockets
 * who are in a channel, and on join will send out 'addPeer' events to each pair
 * of users in a channel. When clients receive the 'addPeer' even they'll begin
 * setting up an RTCPeerConnection with one another. During this process they'll
 * need to relay ICECandidate information to one another, as well as SessionDescription
 * information. After all of that happens, they'll finally be able to complete
 * the peer connection and will be streaming audio/video between eachother.
 */
io.on('connection', function(socket) {
  console.log('a user has connected');
  socket.on('send', message => {
    io.to(message.channel_id).emit('display-message', message);
  });
  socket.on('subscribe', channel => {
    // console.log('a user subscribed to channel: ', channel);
    socket.join(channel);
  });
  socket.on('unsubscribe', channel => {
    socket.leave(channel);
  });
  // console.log('a user connected. Client id:', socket.id);
  // console.log('Connecto to room numba', socket.rooms);
  // console.log('Handshake details', JSON.stringify(socket.handshake));
  socket.channels = {};
  sockets[socket.id] = socket;

  // console.log('[' + socket.id + '] connection accepted');
  socket.on('disconnected', function() {
    console.log('MID?: SOCKET CHANNELS', sockets.channels);
    for (var channel in socket.channels) {
      part(channel);
    }
    // console.log('[' + socket.id + '] disconnected');
    delete sockets[socket.id];
  });

  socket.on('join', function(config) {
    // console.log('[' + socket.id + '] join ', config);
    var channel = config.channel;
    var userdata = config.userdata;
    if (channel in socket.channels) {
      // console.log('[' + socket.id + '] ERROR: already joined ', channel);
      return;
    }
    if (!(channel in channels)) {
      channels[channel] = {};
    }
    for (var id in channels[channel]) {
      channels[channel][id].emit('addPeer', { 'peer_id': socket.id, 'should_create_offer': false });
      socket.emit('addPeer', { 'peer_id': id, 'should_create_offer': true });
    }
    channels[channel][socket.id] = socket;
    socket.channels[channel] = channel;
    console.log('JOIN: CHANNEL', channel,'SOCKET CHANNELS', socket.channels);    
  });

  const part = function(channel) {
    // console.log('SOCKET CHANNELS', channel, socket.channels);
    console.log('LEAVE: CHANNEL', channel, 'SOCKET CHANNELS', socket.channels );
    if (!(channel in socket.channels)) {
      // console.log('[' + socket.id + '] ERROR: not in ', channel);
      console.log('SAME ERROR');
      return;
    }
    delete socket.channels[channel];
    delete channels[channel][socket.id];
    for (var id in channels[channel]) {
      channels[channel][id].emit('removePeer', { 'peer_id': socket.id });
      socket.emit('removePeer', { 'peer_id': id });
    }
  };

  socket.on('part', part);

  socket.on('relayICECandidate', function(config) {
    var peer_id = config.peer_id;
    var ice_candidate = config.ice_candidate;
    // console.log('[' + socket.id + '] relaying ICE candidate to [' + peer_id + '] ', ice_candidate);
    if (peer_id in sockets) {
      sockets[peer_id].emit('iceCandidate', { 'peer_id': socket.id, 'ice_candidate': ice_candidate });
    }
  });
  socket.on('relaySessionDescription', function(config) {
    var peer_id = config.peer_id;
    var session_description = config.session_description;
    // console.log('[' + socket.id + '] relaying session description to [' + peer_id + ']', session_description);
    if (peer_id in sockets) {
      sockets[peer_id].emit('sessionDescription', { 'peer_id': socket.id, 'session_description': session_description });
    }
  });
});
