import React, { Component } from 'react';
import _ from 'lodash';

import { Segment } from 'semantic-ui-react';

class MessageBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (Object.keys(this.props.messages).length === 0) {
      return <div>Loading... </div>;
    } 

    const messages = _.map(this.props.messages, message => {
      return (
<<<<<<< 632e1b211700ed4331730cc0d174a413085e50c7
        <Segment key={message.id}> 
          <h4>{message.user}</h4>
          <div>{message.text}</div>
        </Segment>
      );
    });

=======
        <div key={message.id}> 
          <h4> {message.user} </h4>
          <div> {message.text} </div>
        </div>
      )
    })
    
>>>>>>> implement Redux front-end with dummy data, incomplete message input
    return (
      <div>
        {messages}
      </div>
    );
  }
}

export default MessageBoard;