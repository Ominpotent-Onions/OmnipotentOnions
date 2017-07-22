import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../actions';

import { Segment } from 'semantic-ui-react';

import Groups from './groups';
import Channels from './channels';
import Messages from './messages';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChannels: false,
      showMessages: false
    };
    this.onClickGroup = this.onClickGroup.bind(this);
  }
  componentWillMount() {
    this.props.fetchProfile(window.myUser);    
  }
  onClickGroup(e) {
    console.log(e.target.value);
    if (this.state.channelId === undefined) {
      this.setState({
        showChannels: !this.state.showChannels,
        channelId: e.target.value
      });
    } else if (e.target.value === this.state.channelId && this.state.showChannels === true) {
      this.setState({
        showChannels: !this.state.showChannels,
        channelId: undefined
      });
    } else if (e.target.value !== this.state.channelId) {
      this.setState({
        channelId: e.target.value
      });
    }
  }
  render() {
    return (
      <div>
        <h1>Welcome to Connect, {window.myUser.display}</h1>
        <Segment.Group horizontal> 
          <Segment><Groups channels={this.onClickGroup}/></Segment>
          {
            this.state.showChannels ? <Segment><Channels channel={this.state.channelId}/></Segment> : null
          }
        </Segment.Group>
      </div>
    );
  }  
}
      
export default connect(null, { fetchProfile} )(Main);