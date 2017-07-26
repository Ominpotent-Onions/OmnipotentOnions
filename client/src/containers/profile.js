import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { updateProfileBio, fetchProfile } from '../actions';
import axios from 'axios';

export class Profile extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
    // this.props.fetchProfile(window.myUser);
  }

  componentWillMount() {
    this.props.fetchProfile(window.myUser);
  }

  renderField(field) {
    // const { meta: { touched, error } } = field; 
    // const textareaType = <textarea {...input} placeholder={label}  type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`}/>;
    // const inputType = <input {...input} placeholder={label}  type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`}/>;
    return (
      <div>
        <input
          type='text'
          {...field.input} 
        />
      </div>
    );
  }


  editProfile(e) {
    console.log('edit profile function', e.editProfile);
    let aboutMe = e.editProfile;
    let profile_id = window.myUser.id;
    this.props.updateProfileBio(aboutMe, profile_id);
    // this.props.fetchProfile(window.myUser);
  }
  
  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        {/* {console.log(window.myUser)} */}
        {/* {console.log('profile props ', this.props.profile)} */}

        <img src={this.props.profile.profilePic}></img>
        <p>name: {this.props.profile.display}</p>
        <p>email: {this.props.profile.email}</p>
        <p>aboutMe: {this.props.profile.aboutMe}</p>
        <form onSubmit={handleSubmit(this.editProfile.bind(this))}>
          <Field
            name='editProfile'
            component='textarea'
          />
          <button type = 'submit'>Submit Change</button>
        </form>
      </div>    
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('mapstateprofile ', state);
  return {groups: state.groups, profile: state.profile};
};


export default reduxForm({
  form: 'ProfileForm'
})(
  connect(mapStateToProps, {fetchProfile, updateProfileBio})(Profile)
);