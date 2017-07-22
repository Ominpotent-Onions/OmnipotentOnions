import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../actions';
import _ from 'lodash';

import { Segment } from 'semantic-ui-react';


export class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    console.log('PROPS OF CHANNEL ----constructor------ channel: ', this.props.channel);
    // this.props.fetchChannels(this.props.channel);
    // this.setState(this.state);
    // this.props.fetchChannels(this.props.channel).then(channels => {
    //   this.setState({
    //     channels: channels.payload.data
    //   });
    // });
    this.dispatch(this.props.fetchChannels(this.props.channel));

  }
  componentDidMount() {
    // console.log('containers/channels I am hardcoded fix me');
    // this.forceUpdate();
    // this.props.fetchChannels(this.props.channel).then(channels => {
    //   console.log('CONTAIINERS/CHANNELS: ', channels);
    //   this.setState({

    //   })
    // });
    // this.props.fetchChannels(this.props.channel);
    console.log('CONTAINER/CHANNELS ---------didMount------------');

  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.channel) !== JSON.stringify(nextProps)) { 
      console.log('WILL RECEIVE PROPS: ', nextProps.channel, true); 
      // this.props.fetchChannels(nextProps.channel);
      // this.state.count++;
      // console.log(this.state.count++);
    }
  }

  renderChannels() {
    console.log('CONTAINER/CHANNELS state.channels: ', this.props.channels);
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

  render() {
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