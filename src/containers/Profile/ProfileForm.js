import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { states } from "./data/us-states";
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export class ProfileForm extends Component {
    constructor(props) {
        super(props)
        this.state = {};
        // set the state to the profile params.  Dont use the profile object
        // as it may need to be reset on cancelation and could be used elsewhere
        for(var x in props.profile){
          this.setState[x]=props.profile[x] || ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.onStateSelect = this.onStateSelect.bind(this);
    }

    handleChange(evt){
      this.setState({[evt.target.name]: evt.target.value})
    }

    handleDayChange(day){
      this.setState({dob: new Date(day).toLocaleDateString()})
    }
    handleGenderChange(vals){
      this.setState({gender: vals})
    }
    onStateSelect = (event, state) => {
    // event {SyntheticEvent<HTMLSelectElement>} - React HTML event
    // state {Object} - Object representing the state
    // state.name {string} - The full name of the selected state
    // state.abbreviation {string} - The two letter abbreviation of the states name
      this.setState({state: state.name})
    }

    render() {
        let delProfile = this.props.deleteProfile ?
                        (<Button color='danger'
                                 className='btn-block wide-text profile-form-save-btn'
                                 size='lg'
                                 onClick={ () => this.deleteProfile() }>
                                 Delete
                          </Button>) : ""
        return (
            <div className='profile-form-container'>
                <div className='profile-form-first-row'>
                    <div className='profile-form-first-name'>
                        <Input name="first_name"
                                type='text'
                                placeholder='First Name'
                                value={this.state.first_name}
                                onChange={this.handleChange} />
                    </div>
                    <div className='profile-form-middle-initial'>
                        <Input name="middle_name"
                               type='text'
                               placeholder='Middle Initial'
                               value={this.state.middle_name}
                               onChange={this.handleChange}/>
                    </div>
                    <div className='profile-form-last-name'>
                        <Input name="last_name"
                               type='text'
                               placeholder='Last Name'
                               value={this.state.last_name}
                               onChange={this.handleChange}/>
                    </div>
                </div>
                <div className='profile-form-second-row'>
                    <div className='profile-form-birthday'>
                        <div> Birthday: </div>
                        <DayPickerInput onDayChange={this.handleDayChange}
                                        placeholder={this.state.dob}/>
                    </div>
                    <div className='profile-form-gender'>
                        <div> Gender: </div>
                        <ButtonToolbar>
                            <ToggleButtonGroup name='gender' type="radio"
                                value={this.state.gender}
                                onChange={this.handleGenderChange}>
                                <ToggleButton value={'M'}>Male</ToggleButton>
                                <ToggleButton value={'F'}>Female</ToggleButton>
                                <ToggleButton value={'O'}>Other</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </div>
                </div>
                <div className='profile-form-third-row'>
                    <div className='profile-form-street-address'>
                        <Input name="street"
                               type='text'
                               placeholder='Street Address'
                               value={this.state.street}
                               onChange={this.handleChange}/>
                    </div>
                    <div className='profile-form-city'>
                        <Input name="city"
                               type='text'
                               placeholder='City'
                               value={this.state.city}
                               onChange={this.handleChange}/>
                    </div>
                    <div className='profile-form-state'>
                        {this.renderStateSelect()}
                    </div>
                    <div className='profile-form-zip-code'>
                        <Input type='text'
                                name="zip"
                                placeholder='Zip Code'
                                value={this.state.zip}
                                onChange={this.handleChange}/>
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
                    <Button color='default'
                            className='btn-block wide-text profile-form-cancel-btn'
                            size='sm' onClick={ this.props.cancel }>
                            CANCEL
                    </Button>
                    <Button color='primary'
                            className='btn-block wide-text profile-form-save-btn'
                            size='lg' onClick={ () => this.submitProfile() }>
                            SAVE
                    </Button>
                    {delProfile}
                </div>
            </div>
        );
    }

    renderStateSelect(){
      return (
        <select
         id="state"
         name="state"
         onChange={this.handleChange}
       >
         {states.map((state, i) => {
           let selected = (state.abbreviation === this.state.state);
           return (
             <option selected={selected} key={state.name} value={state.abbreviation} >
               {state.name}
             </option>
           );
         })}
       </select>
      )
    }

    submitProfile() {
      if(!this.state.id || this.state.id===""){
        this.state.name =  this.state.first_name +" "+this.state.last_name;
      }
      this.props.saveProfile(this.state);
    }

    deleteProfile(){
      confirmAlert({
      title: 'Confirm Profile Delete',
      message: 'Are you sure you want to delete this profile?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.deleteProfile(this.state.id)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    })
    }
}

export default ProfileForm;
