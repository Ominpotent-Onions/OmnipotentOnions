import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../actions';
import _ from 'lodash';

import { Segment } from 'semantic-ui-react';

export class Channels extends Component {
  constructor(props) {
    super(props);
    // this.props.fetchChannels(this.props.groupId);
    console.log('INSIDE CONSTRUCTOR OF CHANNEL');
  }
  componentWillMount() {
    console.log('containers/channels WILL MOUNT');
    // this.props.fetchChannels(1);
  }

  renderChannels() {
    return _.map(this.props.channels, channel => {
      return (
        <Segment key={channel.id}>
          <button> 
            {channel.name} 
          </button>
        </Segment>
      );
    });
  }

  render() {
    console.log('INSIDE RENDER OF CHANNELS');
    return (
      <div>
        <h2>Channels</h2>
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

export default connect(mapStateToProps, { fetchChannels })(Channels);