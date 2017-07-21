import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createGroup, createInvite, addProfileGroup} from '../actions';

class NewGroup extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field; 

    return (
      <div>
        <input
          type='text'
          {...field.input} 
        />
      </div>
    );
  }

  onSubmit(element) {
    let newGroupName = element.groupName;
    let profile_id = this.props.profile.id;
    this.props.createGroup(newGroupName, profile_id);
    //   .then(group => {
    //     console.log('gid', group.id)  
    //     // this.props.addProfileGroup(profile_id, group.id);
    //   })
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name='groupName'
            component={this.renderField}
          />
          <button type='submit'>Create Group</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { groupName: state.groupName };
};

export default reduxForm({
  form: 'GroupsForm'
})(
  connect(mapStateToProps, { createGroup, createInvite, addProfileGroup })(NewGroup)
);
