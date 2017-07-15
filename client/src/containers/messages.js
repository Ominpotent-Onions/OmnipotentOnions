import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../actions';
import MessageBoard from '../components/messages_board';

class Messages extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    return (
      <div> 
        <h1> Messages </h1>
        <MessageBoard 
          messages={this.props.messages}
        />
      </div>
    );
  }
}
function mapStateToProps (state) {
  return { messages: state.messages };
}

export default connect(mapStateToProps, { fetchMessages })(Messages);