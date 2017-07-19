import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createInvite } from '../actions';

import shortid from 'shortid';

class InviteLink extends Component {
  componentDidMount() {
    if(!this.props.group.shortID){
      this.props.group.shortID = shortid.generate();
    }
  }


  handleGroupInviteButton() {
    const message = 'Share this code with others to join the group! :';
    const shortID = this.props.group.shortID;

    console.log(message + '\n' + shortID);
  }

  render() {    
    return (
      <div>
        <button onClick={() => this.handleGroupInviteButton()}>+</button>
      </div>
    );
  }
}

export default InviteLink;