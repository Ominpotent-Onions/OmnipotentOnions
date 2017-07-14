import React from 'react';
var getUserMedia = require('getusermedia');
var Peer = require('simple-peer');
var peer = new Peer({
  //What this does is who is the first peer?
  initiator: location.hash === '#init',
  trickle: false
  // stream: stream
});

class ChatLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userOne: '',
      userTwo: '',
      yourValue: '',
      theirValue: '',
      message: '',
      sentMessage: ''
    };
    this.connectHandler = this.connectHandler.bind(this);
    this.sendChangeHandler = this.sendChangeHandler.bind(this);
    this.sendHandler = this.sendHandler.bind(this);
    this.yourHandler = this.yourHandler.bind(this);
    this.theirHandler = this.theirHandler.bind(this);

    this.bindProps = () => {
      console.log(this);
      console.log(peer);
      peer.on('data', ((data) => {
        console.log('hi');
        console.log(data);
        this.setState({
          sentMessage: '' + data
        });
        //this.props.onData(JSON.stringify(raw.toString()))
      }));
    };
  }

  componentDidMount() {
    //test to see if we are getting signal and data;
    console.log(peer);
    peer.on('signal', (data) => {
      console.log(JSON.stringify(data));
      var yourId = JSON.stringify(data);
      this.setState({
        yourValue: yourId
      });
      // document.getElementById('yourId').value = JSON.stringify(data);
    });
    this.bindProps();
  }
  //event listener that when click submit, we signal the other id
  connectHandler() {
    var otherId = JSON.parse(this.state.theirValue);
    console.log(otherId);
    peer.signal(otherId);
  }

  sendChangeHandler(e) {
    this.setState({
      message: e.target.value
    });
    console.log(this.state.message);
  }

  sendHandler(e) {
    peer.send(this.state.message);
  }

  yourHandler(e) {
    this.setState({
      yourValue: e.target.value
    });
  }

  theirHandler(e) {
    this.setState({
      theirValue: e.target.value
    });
  }


  render() {
    return (
      <div>
        <label>Your ID:</label><br/>
        <textarea id="yourId" value={this.state.yourValue} onChange={this.yourHandler}></textarea><br/>
        <label>Other ID:</label><br/>
        <textarea id="otherId" value={this.state.theirValue} onChange={this.theirHandler}></textarea>
        <button id="connect" onClick={this.connectHandler}>connect</button><br/>

        <label>Enter Message:</label><br/>
        <textarea id="yourMessage" onChange={this.sendChangeHandler} ></textarea>
        <button id="send" onClick={this.sendHandler}>send</button>
        <div id="messages">{this.state.sentMessage}</div>
      </div>
    );
  }
}

export default ChatLog;


