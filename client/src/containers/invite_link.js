import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createInvite } from '../actions';

import shortid from 'shortid';

class InviteLink extends Component {
  componentDidMount() {
    let shortID = shortid.generate();
    this.props.createInvite(this.props.group, shortID);
  }


  handleGroupInviteButton() {
    const message = 'Share this code with others to join the group! :';
    alert(message + '\n' + shortID);
  }

  render() {    
    return (
      <div>
        <button onClick={() => this.handleGroupInviteButton()}>+</button>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { groups: state.groups, profile: state.profile };
};

export default connect(mapStateToProps, { createInvite })(InviteLink);