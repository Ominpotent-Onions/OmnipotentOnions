import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroups, createGroup } from '../actions';

import InviteLink from './invite_link';
import NewGroup from './new_group';
import JoinGroup from './join_group';
import { Segment } from 'semantic-ui-react';

class Groups extends Component { 
  // constructor(props) {
  //   super(props);
  //   this.props.fetchGroups(this.props.profile);
  // }
  componentWillMount() {
    this.props.fetchGroups(this.props.profile);    
  }
  renderGroups() {
    return _.map(this.props.groups, group => {
      return (
        <Segment key={group.id}>
          <div> {group.name} </div>
          <InviteLink group={group}/>
        </Segment>
      );
    });
  }

  addNewGroup() {
    console.log('hello');
  }

  render() {
    return (
      <div>
        <h2>Groups</h2>
        <Segment.Group>
          {this.renderGroups()}
          <NewGroup />
          <JoinGroup groups={this.props.groups}/>
        </Segment.Group>
         
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { groups: state.groups, profile: state.profile };
};

export default connect(mapStateToProps, { fetchGroups, createGroup })(Groups);