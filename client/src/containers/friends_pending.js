import React, { Component } from 'react';
import { fetchFriendRequests, fetchPendingRequests, fetchFriends } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import axios from 'axios';

export class PendingList extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      term: '',
      danger: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onAddFriend = this.onAddFriend.bind(this);
  }

  onAddFriend(e) {
    e.preventDefault();
    if (this.props.profile.email !== this.state.term) {
      axios.post(`/pendingfriends/sendRequest/${this.props.profile.id}`, {
        emailAddress: this.state.term
      })
        .then(response => {
          console.log('success!');
          this.props.fetchFriendRequests(this.props.profile.id);
        })
        .catch(err => {
          this.setState({
            danger: 'User is already your friend'
          });
        });
    } else {
      this.setState({
        danger: 'You cannot add yourself as a friend'
      });
    }
  }

  onInputChange(event) {
    this.setState({
      term: event.target.value,
      danger: ''
    });
  }

  renderForm() {
    return (
      <div> 
        To add a friend, please enter their email address below and submit
        <form onSubmit={this.onAddFriend}>
          <input
            placeholder='Enter email address here' 
            value={this.state.term}
            onChange={this.onInputChange}
          /> <br/>
          <div className='dangerMessage' style={{color: 'red'}} >{this.state.danger}</div>
          <button>Add a friend</button>
        </form>
      </div>
    );
  }

  renderPendingRequests() {
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
        {this.renderForm()}
        <h4>Pending Requests</h4>
        {this.renderPendingRequests()}
        <h4>Friend Requests</h4>
        {this.renderFriendRequests()}
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { 
    pending: state.pending, 
    requests: state.requests,
    profile: state.profile
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({ 
    fetchFriends,
    fetchPendingRequests, 
    fetchFriendRequests
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingList);