import React, { Component } from 'react';
import _ from 'lodash';

import { Segment, Label, Image, Header } from 'semantic-ui-react';
var moment = require('moment');

class MessageBoard extends Component {
  constructor(props) {
    super(props);
  }

  renderMessages () {
    return _.map(this.props.messages, message => {
      var myMessage = this.props.profileId === message.profile.id;
      return myMessage ? (
        <Segment.Group compact horizontal key={moment(message.create_at).valueOf()}>
          <Segment inverted color='teal' tertiary>
            <Header color='brown' textAlign='center' size='small'>{message.text}</Header>
          </Segment>
          <Segment basic inverted color='teal' tertiary textAlign='right'> 
            <Label as='a' color='teal'>
              <Image size='medium' floated='right' avatar spaced='left' src={message.profile.profilePic}/>
              {message.profile.display} <br/> 
              {moment(message.create_at).format('h:mma')}
            </Label>
          </Segment>
        </Segment.Group>
      ) : (
        <Segment.Group compact horizontal key={moment(message.create_at).valueOf()}>
          <Segment inverted color='orange' tertiary textAlign='left'> 
            <Label as='a' color='orange'>
              <Image size='medium' avatar floated='left' spaced='right' src={message.profile.profilePic}/>
              {message.profile.display} <br/>
              {moment(message.create_at).format('h:mma')}
            </Label>
          </Segment>
          <Segment basic inverted color='orange' tertiary>
            <Header color='brown' size='small' textAlign='center'>{message.text}</Header>
          </Segment>
        </Segment.Group>
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