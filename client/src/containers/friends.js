import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriends, fetchPendingRequests, fetchFriendRequests } from '../actions';

import FriendsList from './friends_list';
import PendingList from './friends_pending';


export class Friends extends Component {
  constructor(props) {
    super(props);
    this.props.fetchFriends(); // add user id to it at some point
    this.props.fetchPendingRequests();
    this.props.fetchFriendRequests();
  }

  render() {
    return (
      <div>
        <div> <FriendsList /> </div>
        <div> <PendingList /> </div>
      </div>
    );
  }
}

export default connect(null, { fetchFriends, fetchPendingRequests, fetchFriendRequests })(Friends);