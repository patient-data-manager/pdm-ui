import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export class ProfileListRow extends Component {
    render() {
        return (
            <tr className='profile-list-row'>
                <td className='profile-list-row-icon'>
                    <FontAwesome name='user-circle' />
                </td>
                <td className='profile-list-row-info'>
                    <tr className='profile-list-first-info-row'>
                        <td className='profile-list-row-name'> Sarah Ober </td>
                    </tr>
                    <tr className='profile-list-second-info-row'>
                        <td className='profile-list-row-age'> 25 Yrs </td>
                        <td className='profile-list-row-gender'> Female </td>
                    </tr>
                </td>
                <td className='profile-list-row-edit'>
                    <FontAwesome name='edit' />  EDIT
                </td>
            </tr>
        );
    }
}

export default ProfileListRow;