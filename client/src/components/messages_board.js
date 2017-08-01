import React, { Component } from 'react';
import _ from 'lodash';

import { Segment, Divider, Label, Image } from 'semantic-ui-react';


class MessageBoard extends Component {
  constructor(props) {
    super(props);
  }

  renderMessages () {
    console.log('MESSAGES BEING MAPPED: ', this.props.messages[2], '\nprofileId: ', this.props.profileId);
    return _.map(this.props.messages, message => {
      var myMessage = this.props.profileId === message.profile.id;
      return (
        <Segment key={message.id || message.fake_time} textAlign={myMessage ? 'right' : 'left'}> 
          {myMessage ? message.text : null}
          <Label as='a' color={myMessage ? 'teal' : 'orange'}>
            <Image avatar spaced='right' src={message.profile.profilePic}/>
            {message.profile.display} 
            <Label.Detail>
              {Date.parse(message.create_at || message.fake_time)}
            </Label.Detail>
          </Label>
          {!myMessage ? message.text : null}
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

  // formatDate (date) {
  //   var hours = date.getHours();
  //   var minutes = date.getMinutes();
  //   var ampm = hours >= 12 ? 'pm' : 'am';
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // the hour '0' should be '12'
  //   minutes = minutes < 10 ? '0' + minutes : minutes;
  //   var strTime = hours + ':' + minutes + ' ' + ampm;
  //   return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + '  ' + strTime;
  // }
}
 
export default MessageBoard;