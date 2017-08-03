import React, { Component } from 'react';
import _ from 'lodash';

import { Segment, Label, Image, Header } from 'semantic-ui-react';
var moment = require('moment');

class MessageBoard extends Component {
  constructor(props) {
    super(props);
  }

  renderMessages () {
    return _.map(this.props.messages, (message, i) => {
      var myMessage = this.props.profileId === message.profile.id;
      const colors = ['red', 'orange', 'yellow', 'green', 'olive', 'blue', 'pink', 'violet', 'purple'];
      var randColor = colors[Math.floor(Math.random() * colors.length)];
      return myMessage ? (
        <Segment inverted color='teal' tertiary compact key={moment(message.create_at).valueOf()} textAlign='left'> 
          <Label color={'teal'}>
            <Image size='medium' avatar floated='right' spaced='left' src={message.profile.profilePic}/>
            {message.profile.display} <br/> 
            {moment(message.create_at).format('h:mma')}
          </Label>
          <Header floated='right' size='small'>{message.text}</Header>
        </Segment>
      ) : (
        <Segment inverted color={randColor} tertiary compact key={moment(message.create_at).valueOf()} textAlign='left'> 
          <Label color={randColor}>
            <Image size='medium' avatar floated='right' spaced='left' src={message.profile.profilePic}/>
            {message.profile.display} <br/>
            {moment(message.create_at).format('h:mma')}
          </Label>
          <Header floated='right' size='small'>{message.text}</Header>
        </Segment>
      );
    });
  }

  render() {
    if (Object.keys(this.props.messages).length === 0) {
      return <div>Loading... </div>;
    } 
    

    return (
      <div>
        {this.renderMessages()}
      </div>
    );
  }
}
 
export default MessageBoard;