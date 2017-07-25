import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';

export class PendingList extends Component {

  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onAddFriend = this.onAddFriend.bind(this);
  }

  onAddFriend(e) {
    e.preventDefault();
    console.log('handle submit!');
    console.log(this.state.term);
    console.log('profile id', this.props.profile.id);
    axios.post(`/pendingfriends/sendRequest/${this.props.profile.id}`, {
      emailAddress: this.state.term
    })
      .then(response => {
        console.log('success!');
      })
      .catch(err => {
        console.log('nuooooo', err);
      });
  }

  onInputChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  renderPendingRequests() {
    if (!this.props.pending) {
      return <div>No pending friend requests</div>;
    }

    return _.map(this.props.pending, request => {
      return (
        <div key={request.id}>
          <div>Name: {request.user.display} </div>
          <div>Email: {request.user.email} </div>
          <button>Accept</button> 
          <button>Decline</button><br/>
          -----
        </div>
      );
    });
  }

  renderFriendRequests() {
    return _.map(this.props.requests, request => {
      return (
        <div key={request.id}>
          <div>Name: {request.friend.display} </div>
          <div>Email: {request.friend.email} </div>
          <button>Cancel request</button> <br/>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Pending List</h3>
        To add a friend, please enter their email address below and submit
        <form onSubmit={this.onAddFriend}>
          <input
            placeholder='Enter email address here' 
            value={this.state.term}
            onChange={this.onInputChange}
          /> <br/>
          <button>Add a friend</button>
        </form>
        <h4>Pending Requests</h4>
        {this.renderPendingRequests()}
        <h4>Friend Requests</h4>
        {this.renderFriendRequests()}
      </div>
    );
  }
}

let mapStateToProps = function(state) {
  return { 
    pending: state.pending, 
    requests: state.requests,
    profile: state.profile
  };
};

export default connect(mapStateToProps, null)(PendingList);