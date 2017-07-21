import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroups, createGroup } from '../actions';

import InviteLink from './invite_link';
import NewGroup from './new_group';
import JoinGroup from './join_group';
import { Segment } from 'semantic-ui-react';

class Groups extends Component { 

  componentWillMount() {
    this.props.fetchGroups(this.props.profile);
  }

  renderGroups() {
    return _.map(this.props.groups, group => {
      return (
        <Segment key={group.id}>          
          <div> {group.groups.name} </div>
          {/*<InviteLink group={group.groups} profile={this.props.profile}/>*/}
        </Segment>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Groups</h2>
        <Segment.Group>
          {this.renderGroups()}
          <NewGroup profile={this.props.profile}/>
          {/*<JoinGroup />*/}
        </Segment.Group>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { groups: state.groups, profile: state.profile };
};

export default connect(mapStateToProps, { fetchGroups, createGroup })(Groups);