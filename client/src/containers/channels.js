import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../actions';
import {Field, reduxForm} from 'redux-form';
import io from 'socket.io-client';
import axios from 'axios';
import { Segment } from 'semantic-ui-react';

class Channels extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchChannels();
  }

  renderField(field) {
    console.log('this is channel field ' + field);
    return (
      <div className='channel'>
        <input
          type='text'
          {...field.input}
        />
      </div>
    );
  }

  renderChannels() {
    return _.map(this.props.channels, channel => {
      return (
        <Segment key={channel.id}>
          <div> 
            {channel.name} 
          </div>
        </Segment>
      );
    });
  }

  onSubmit(name) {
    console.log(name);
    const channelName = {
      id: 5,
      name: name.channel
    };
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        <h2>Channels</h2>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <button type='submit'>
            <i className="add circle icon"></i>
          </button>
            <Field 
              label='Please enter your message here'
              name='channel'
              component={this.renderField}
            />
        </form>
        <Segment.Group>
          {this.renderChannels()}
        </Segment.Group>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return { channels: state.channels };
};

export default reduxForm({
  form: 'ChannelForm'
})(
  connect(mapStateToProps, { fetchChannels })(Channels)
);

// export default connect(mapStateToProps, { fetchChannels })(Channels);