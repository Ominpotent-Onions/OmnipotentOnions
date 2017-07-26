import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
// import { createProfile } from '../actions';

class NewProfile extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;

    return (
      <div>
        <input type='text' {...field.input}/>
      </div>
    );
  }

  onEditProfile(e) {
    console.log('CONTIANERS/NEW_Profile: profile info ');
    let newGroup = {
      groupId: this.props.groupId,
      channelName: e.channelName
    };
    e.channelName = '';
    this.props.createChannel(newGroup);
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
})( connect(mapStateToProps, { createChannel })(NewChannel) );
