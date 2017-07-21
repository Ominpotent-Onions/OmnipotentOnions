import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchOneGroup, fetchProfilesGroups, joinGroup } from '../actions';

class JoinGroup extends Component {

  // componentWillMount() {
    
  // }

  renderField(field) {
    const { meta: { touched, error } } = field; 

    return (
      <div className='shortID'>
        <input
          type='text'
          {...field.input} 
        />
      </div>
    );
  }

  onSubmit(group) {
    let shortID = group.shortID;
    let profile_id = this.props.profile.id;
    this.props.fetchOneGroup(shortID, profile_id);
    //   .then(group => {
    //     console.log(group.payload.data)
    // })
    // .then(group => {
    //   console.log('a', group);
    // })
    // this.grabGroup(shortID, group => group)

    //ryw0Y3CBb
    // let message = _.filter(this.props.groups, (group) => (group.shortID === event.shortID));

    // if(message[0] === undefined){
    //   alert('Group not found!');
    // } 

    // let groupId = message[0].id;
    // let profileId = this.props.profile.id;

    // let data = {
    //   //id will be auto-incremented 
    //   id: 3,
    //   profile_id: profileId,
    //   group_id: groupId
    // };
    
    // this.props.joinGroup(data);
    
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label='Add new group'
            name='shortID'
            component={this.renderField}
          />
          <button type='submit'>Join Group</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  console.log(state, 'state');
  return { group: state.group };
};

export default reduxForm({
  form: 'formReducer'
})(
  connect(mapStateToProps, { fetchOneGroup, fetchProfilesGroups, joinGroup })(JoinGroup)
);
