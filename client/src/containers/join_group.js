import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchProfilesGroups, joinGroup } from '../actions';

class NewGroup extends Component {

  constructor(props) {
    super(props);
  }

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

  onSubmit(event) {
    let message = _.filter(this.props.groups, (group) => (group.shortID === event.shortID));
    let groupId = message[0].id;

    let data = {
      //id will be incremented 
      id: 3,
      //profile_id will be the id of whoever is logged in 
      profile_id: 1,
      group_id: groupId
    };
    
    this.props.joinGroup(data);
    console.log(this.props.fetchProfilesGroups());
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

export default reduxForm({
  form: 'GroupForm'
})(
  connect(null, { fetchProfilesGroups, joinGroup})(NewGroup)
);
