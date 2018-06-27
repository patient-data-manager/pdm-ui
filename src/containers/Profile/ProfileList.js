import React, { Component } from 'react';
import ProfileListRow from './ProfileListRow'
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {createProfile, updateProfile, setCurrentProfile, deleteProfile} from '../../actions/profiles'
import { Button } from 'reactstrap';
import FlipMove from 'react-flip-move';

export class ProfileList extends Component {

  constructor(props) {
    super(props);
    this.state = {profiles: props.profiles};
  }


  render() {
    let profilesList = this.props.profiles.map(profile => <ProfileListRow key={profile.id} profile={profile} setCurrentProfile={this.props.setCurrentProfile}/>)
    return (
      <div className='profile-list-container'>
      <FlipMove>
        { profilesList }
      </FlipMove>
        <div className='profile-new-container'>
          <div className='profile-new-btn'>
              <FontAwesome name='plus-circle' /> NEW
          </div>
        </div>
        <Button color="link" size="sm" onClick={() => this.createP() }>create</Button>
      </div>
      );
    }
    createP(){
      this.props.createProfile({name: "Testy Jones"})
    }
    rotate(){
      this.props.setCurrentProfile(this.props.profiles[1].id)
    }
  }


function mapStateToProps(state) {
  console.log("Its State");
  console.log(state);
  return {
    profiles: state.profiles
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createProfile,updateProfile,deleteProfile,setCurrentProfile}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileList)
