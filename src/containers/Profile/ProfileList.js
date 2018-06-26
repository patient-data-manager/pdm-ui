import React, { Component } from 'react';
import ProfileListRow from './ProfileListRow'
import FontAwesome from 'react-fontawesome';

export class ProfileList extends Component {
    render() {
        // TO-DO remove mock data
        const profiles = [
            {   'name': 'Sarah Ober',
                'age': 25,
                'gender': 'Female',
                'alertCount': 2
            },
            {   'name': 'Jessica Ober',
                'age': 23,
                'gender': 'Female',
                'alertCount': 1
            },
            {   'name': 'Peg Ober',
                'age': 54,
                'gender': 'Female',
                'alertCount': 5
            },
            {   'name': 'Steve Ober',
                'age': 61,
                'gender': 'Male',
                'alertCount': 0
            }
        ]

        const profilesList = profiles.map(function(profile) {
            return <ProfileListRow profile={profile}/>;
        })

        return (
            <div className='profile-list-container'>
                { profilesList }
                <div className='profile-new-container'>
                    <div className='profile-new-btn'>
                        <FontAwesome name='plus-circle' /> NEW
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileList;