import React, { Component } from 'react';
import ProfileListRow from './ProfileListRow';
import ProfileForm from './ProfileForm';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {createProfile, updateProfile, setCurrentProfile, deleteProfile} from '../../actions/profiles'
import { Button } from 'reactstrap';
import FlipMove from 'react-flip-move';

export class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    		profiles: props.profiles,
            new: false
    };
    this.loadNewForm = this.loadNewForm.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);
  }

  render() {
    let profilesList = this.props.profiles.map(profile => <ProfileListRow key={profile.id}
                                                           deleteProfile={this.props.deleteProfile}
                                                           updateProfile={this.props.updateProfile}
                                                           profile={profile}
                                                           setCurrentProfile={this.props.setCurrentProfile}
                                                           showEditBtn={true}/>)
    return (
      <div className='profile-list-container'>
        <FlipMove className='profile-flip-list'>
            { profilesList }
        </FlipMove>
        <div className='profile-new-container'>
            { this.renderNewForm(this.state.new) }
        </div>
      </div>
      );
    }

    loadNewForm() {
        this.setState({new: true});
    }

    handleFormCancel() {
        this.setState({new: false});
    }

    renderNewForm(showNewForm) {
        if (showNewForm) {
            return (
                <div className='profile-new-form'>
                    <div className='profile-new-form-title'>
                        <div className='profile-row-icon'>
                        <FontAwesome name='user-circle' /></div>
                        <div className='profile-new-form-label'>
                          Create new profile:
                        </div>
                    </div>
                    <ProfileForm saveProfile={this.props.createProfile}
                                 profile={this.newProfile()}
                                 cancel={this.handleFormCancel} />
                </div>
            );
        } else {
            return(
                <div className='profile-new-btn'>
                    <a onClick={ this.loadNewForm }>
                      <FontAwesome name='plus-circle' /> NEW </a>
                </div>
            );
        }
    }

    newProfile(){
      return {name: "New Profile",
              dob: null,
              first_name: "",
              last_name: "",
              street: "",
              city: "",
              state: "",
              zip: "",
              gender: null}
    }
}


function mapStateToProps(state) {
    return {
        profiles: state.profiles
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({createProfile,updateProfile,deleteProfile,setCurrentProfile}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileList)
