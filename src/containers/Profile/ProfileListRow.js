import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export class ProfileListRow extends Component {
    render() {
        return (
            <div className='profile-row-container'>
                <div className='profile-row-icon'><FontAwesome name='user-circle' /></div>
                <div className='profile-row-info'>
                    <div className='profile-first-info-row'> 
                        <div className='profile-row-name'> {this.props.profile.name } </div>
                        <div className='profile-row-alerts'>
                            <FontAwesome name='circle'></FontAwesome>
                        </div>
                    </div>
                    <div className='profile-second-info-row'>
                        <div className='profile-row-age'> {this.props.profile.age } Yrs </div>
                        <div className='profile-row-gender'> {this.props.profile.gender } </div>
                    </div>
                </div>
                <div className='profile-row-edit'><FontAwesome name='edit' />  EDIT</div>    
            </div>
        );
    }
}

export default ProfileListRow;