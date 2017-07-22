import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createChannel } from '../actions';

class NewChannel extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;

    return (
      <div>
        <input type='text' {...field.input}/>
      </div>
    );
  }

  onCreateChannel(e) {
    console.log('CONTIANERS/NEW_CHANNEL: ', e.channelName);
    let newChannel = e.groupName;
    let groupId = this.props.groupId;
    e.channelName = '';
    // this.props.createChannel();
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onCreateChannel.bind(this))}>
          <Field
            name='channelName'
            component={this.renderField}
          />
          <button type='submit'>Create Channel</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channelName: state.channelName
  };
};

export default reduxForm({
  form: 'ChannelsForm'
})( connect(mapStateToProps, { createChannel})(NewChannel) );