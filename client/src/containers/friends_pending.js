import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

export class PendingList extends Component {

  renderPendingRequests() {
    return _.map(this.props.pending, request => {
      return (
        <div key={request.id}>
          <div>Name: {request.display} </div>
          <div>email: {request.email} </div>
          <button>Cancel request</button> <br/>
          -----
        </div>
      );
    });
  }

  renderFriendRequests() {
    return _.map(this.props.requests, request => {
      return (
        <div key={request.id}>
          <div>Name: {request.display} </div>
          <div>email: {request.email} </div>
          <button>Accept</button> 
          <button>Decline</button><br/>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Pending List</h3>
        <h4>Pending Requests</h4>
        {this.renderPendingRequests()}
        <h4>Friend Requests</h4>
        {this.renderFriendRequests()}
      </div>
    );
  }
}

let mapStateToProps = function(state) {
  return { pending: state.pending, requests: state.requests };
};

export default connect(mapStateToProps, null)(PendingList);