import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createGroup, createInvite} from '../actions';

class NewGroup extends Component {

  constructor(props) {
    super(props);
  }

  renderField(field) {
    const { meta: { touched, error } } = field; 

    return (
      <div className='group'>
        <input
          type='text'
          {...field.input} 
        />
      </div>
    );
  }

  onSubmit(group) {
    console.log(group);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label='Add new group'
            name='group'
            component={this.renderField}
          />
          <button type='submit'>Create Group</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  groups: 'GroupForm'
})(
  connect(null, { createGroup, createInvite })(NewGroup)
);
