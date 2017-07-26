import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';

export class Profile extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field; 
    return (
      <div>
        <label> {field.input.placeholder} </label>
        <input
          type='textarea'
          {...field.input} 
        />
      </div>
    );
  }

  editProfile(e) {
    console.log(e.editProfile);
  }
  
  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        {console.log(window.myUser)}
        <img src={window.myUser.profilePic}></img>
        
        <p>name: {window.myUser.display}</p>
        <p>email: {window.myUser.email}</p>
        <form onSubmit={handleSubmit(this.editProfile.bind(this))}>
          <Field
            name='editProfile'
            component={this.renderField}
          />
          <button type = 'submit'>Submit Changes</button>
        </form>
      </div>    
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  };
};


export default reduxForm({
  form: 'ProfileForm'
})(
  connect(mapStateToProps, null)(Profile)
);