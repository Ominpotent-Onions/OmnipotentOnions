import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createMessage } from '../actions';

export class MessageInput extends Component {

  constructor(props) {
    super(props);
    // console.log('container/messages_input channel: ', this.props.channel);
    // console.log('container/messages_input profile: ', this.props.profile);
  }

  renderField(field) {
    const { meta: { touched, error } } = field; 

    return (
      <div className='message'>
        <input
          type='text'
          {...field.input} 
        />
      </div>
    );
  }

  onSubmit(message) {
    var post = {
      channel_id: this.props.channelId,
      profile_id: this.props.profile.id,
      text: message.message
    }; 
    console.log('message/input MESSAGES FROM INPUT', post);
    this.props.createMessage(post);
    this.props.socket.emit('send', post);
    message.message = '';
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h4>Message Input</h4>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            placeholder='Please enter your message here'
            name='message'
            component={this.renderField}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channel: state.channels,
    profile: state.profile,
  };
};

export default reduxForm({
  form: 'MessageForm'
})(
  connect(mapStateToProps, { createMessage })(MessageInput)
);