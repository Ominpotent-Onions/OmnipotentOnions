import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriends } from '../actions';

import FriendsList from './friends_list';
import PendingList from './friends_pending';


export class Friends extends Component {
  constructor(props) {
    super(props);
    this.props.fetchFriends(); // add user id to it at some point
  }

  render() {
    return (
      <div>Hello, friends list
        <div> <FriendsList /> </div>
        <div> <PendingList /> </div>
      </div>
    );
  }
}

let mapStateToProps = function(state) {
  return { friends: state.friends };
};

export default connect(mapStateToProps, { fetchFriends })(Friends);