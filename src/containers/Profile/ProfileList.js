import React, { Component } from 'react';
import ProfileListRow from './ProfileListRow'

export class ProfileList extends Component {
    render() {
        // TO-DO loop over ProfileListRowComponent
        return (
            <table className='profile-list-table'>
                <ProfileListRow />
                <ProfileListRow />
                <ProfileListRow />
                <ProfileListRow />
                <ProfileListRow />
                <ProfileListRow />
                <ProfileListRow />
                <ProfileListRow />
                <ProfileListRow />
                <ProfileListRow />
                <ProfileListRow />
                <ProfileListRow />
                <ProfileListRow />
                <ProfileListRow />
                <ProfileListRow />
            </table>
        );
    }
}

export default ProfileList;