import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import profiles from '../../reducers/profiles_reducer';

export class ProfileForm extends Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.submitNewProfile = this.submitNewProfile.bind(this);
    }

    render() {
        return (
            <div className='profile-form-container'>
                <div className='profile-form-first-row'>
                    <div className='profile-form-first-name'>
                        <Input type='text' placeholder='First Name' />
                    </div>
                    <div className='profile-form-middle-initial'>
                        <Input type='text' placeholder='Middle Initial' />
                    </div>
                    <div className='profile-form-last-name'>
                        <Input type='text' placeholder='Last Name' />
                    </div>
                </div>
                <div className='profile-form-second-row'>
                    <div className='profile-form-birthday'>
                        <div> Birthday: </div>
                        <DayPickerInput />
                    </div>
                    <div className='profile-form-gender'>
                        <div> Gender: </div>
                        <ButtonToolbar>
                            <ToggleButtonGroup name='gender' type="radio">
                                <ToggleButton value={'M'}>Male</ToggleButton>
                                <ToggleButton value={'F'}>Female</ToggleButton>
                                <ToggleButton value={'O'}>Other</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </div>
                </div>
                <div className='profile-form-third-row'>
                    <div className='profile-form-street-address'>
                        <Input type='text' placeholder='Street Address' />
                    </div>
                    <div className='profile-form-city'>
                        <Input type='text' placeholder='City' />
                    </div>
                    <div className='profile-form-state'>
                        <Input type='text' placeholder='State' />
                    </div>
                    <div className='profile-form-zip-code'>
                        <Input type='text' placeholder='Zip Code' />
                    </div>
                </div>
                <div className='profile-form-fourth-row'>
                    <div className='profile-form-phone-number'>
                        <Input type='text' placeholder='Phone' />
                    </div>
                    <div className='profile-form-phone-type'>
                        <Input type='select' placeholder='Type'>
                            <option>Home</option>
                            <option>Cell</option>
                            <option>Work</option>
                        </Input>
                    </div>
                </div>
                <div className='profile-form-btns'>
                    <Button color='default' className='btn-block wide-text' size='md' onClick={ this.props.cancel }>CANCEL</Button>
                    <Button color='primary' className='btn-block wide-text' size='md' onClick={ this.submitNewProfile }>SUBMIT</Button>
                </div> 
            </div>
        );
    }

    submitNewProfile() {
        console.log('submitting new profiles...')
    }
}

export default ProfileForm;