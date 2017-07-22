import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

export class FriendsList extends Component {

  renderFriends() {
    return _.map(this.props.friends, (friend) => {
      return (
        <div>
          <div> Name: {friend.display} </div>
          <div> Email: {friend.email} </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Friends List</h3>
        {this.renderFriends()}
      </div>
    );
  }
}

let mapStateToProps = function(state) {
  return { friends: state.friends };
};

export default connect(mapStateToProps, null)(FriendsList);