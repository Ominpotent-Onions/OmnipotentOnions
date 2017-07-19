import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createMessage } from '../actions';
import io from 'socket.io-client';

class MessageInput extends Component {

  constructor(props) {
    super(props);
  }

  renderField(field) {
    console.log('this is field, ' + field);
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
    console.log(message);
    // currently only sends { message: 'the message' }
    const data = {
      id: 5,
      user: 'Shi-Hao',
      text: message.message
    };
 
    this.props.socket.emit('send', data);
    // this.props.createMessage(data);
    // clear data after message send
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h4>Message Input</h4>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
           <Field
            label='Please enter your message here'
            name='message'
            component={this.renderField}
          /> 
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'MessageForm'
})(
  connect(null, { createMessage })(MessageInput)
);