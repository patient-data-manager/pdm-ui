import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { confirmAlert } from 'react-confirm-alert';

import { states } from '../../../utils/usStates';
import { phoneTypes } from '../../../utils/phoneTypes';
import { relationshipTypes } from '../../../utils/relationshipTypes';

import TextMaskPhone from '../../elements/TextMaskPhone';

import 'react-confirm-alert/src/react-confirm-alert.css';

export default class ProfileForm extends Component {
  constructor(props) {
    super(props);

    const state = {};
    // set the state to the profile params -- dont use the profile object
    // as it may need to be reset on cancelation and could be used elsewhere
    for (let profileAttribute in props.profile) {
      if (props.profile.hasOwnProperty(profileAttribute)) {
        state[profileAttribute] = props.profile[profileAttribute] || undefined;
      }
    }

    this.state = state;
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleBlur = ({ target }) => {
    this.refs[target.name].validate(target.value);
  };

  submitProfile = () => {
    let profile = this.state;
    let fullName = this.state.first_name + ' ';

    if (this.state.middle_name !== undefined) {
      fullName += this.state.middle_name + ' ';
    }

    fullName += this.state.last_name;
    profile.name = fullName;

    this.props.saveProfile(profile);
    this.props.cancel();
  }

  deleteProfile = () => {
    confirmAlert({
      title: 'Confirm Profile Delete',
      message: 'Are you sure you want to delete this profile?',
      buttons: [
        { label: 'Yes', onClick: () => this.props.deleteProfile(this.state.id) },
        { label: 'No', onClick: () => {} }
      ]
    });
  }

  renderTextField = (label, field, name, autoComplete, classname='', isRequired=false) => {
    return (
      <TextValidator
        label={`${label}${isRequired ? ' *' : ''}`}
        onChange={this.handleChange(field)}
        onBlur={this.handleBlur}
        name={name}
        ref={name}
        autoComplete={autoComplete}
        className={`profile-form__inputfield ${classname}`}
        margin="normal"
        value={this.state[field] || ''}
        validators={isRequired ? ['required'] : []}
        errorMessages={['this field is required']}
      />
    );
  }

  renderRadioButton = (value) => {
    return (
      <FormControlLabel
        className="gender-radio"
        control={
          <Radio
            checked={this.state.gender === value}
            onChange={this.handleChange('gender')}
            value={value}
            name="gender"
            aria-label={value}
          />
        }
        label={value}
      />
    );
  }

  renderDatePicker = (label, name, value) => {
    return (
      <TextField
        label={label}
        name={name}
        type="date"
        className="profile-form__inputfield"
        onChange={this.handleChange(value)}
        value={this.state[value] || ''}
        InputLabelProps={{ shrink: true }}
      />
    );
  }

  renderSelect = (label, name, field, selectArray, classname) => {
    return (
      <FormControl className={`profile-form__inputfield ${classname}`}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Select
          value={this.state[field] || ''}
          onChange={this.handleChange(field)}
          inputProps={{
            name,
            id: name,
          }}
        >
          {selectArray.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  renderPhoneInput = (label, name, field, classname='') => {
    return (
      <FormControl className={`profile-form__inputfield ${classname}`}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Input
          value={this.state[field] || ''}
          onChange={this.handleChange(field)}
          id={name}
          inputComponent={TextMaskPhone}
          autoComplete="tel-national"
        />
      </FormControl>
    );
  }

  render() {
    const { showDelete } = this.props;

    return (
      <div className="profile-form">
        <ValidatorForm
          className="profile-form__form"
          ref="form"
          onSubmit={this.submitProfile}
          instantValidate={false} >
          <div className="profile-form__form-group">
            {this.renderTextField('FIRST NAME', 'first_name', 'firstName', 'given-name', '', true)}
          </div>

          <div className="profile-form__form-group">
            {this.renderTextField('MIDDLE INITIAL', 'middle_name', 'middleName', 'additional-name', 'middle-initial')}
            {this.renderTextField('LAST NAME', 'last_name', 'lastName', 'family-name', 'last-name', true)}
          </div>

          <div className="profile-form__form-group">
            {this.renderDatePicker('DATE OF BIRTH', 'dob', 'dob')}
          </div>

          <div className="profile-form__form-group gender-group">
            <FormLabel component="label" className="gender-label">GENDER</FormLabel>
            {this.renderRadioButton('female')}
            {this.renderRadioButton('male')}
            {this.renderRadioButton('other')}
          </div>

          <div className="profile-form__form-group">
            {this.renderTextField('STREET ADDRESS', 'street', 'street', 'street-address')}
          </div>

          <div className="profile-form__form-group">
            {this.renderTextField('CITY', 'city', 'city', 'address-line1', 'city')}
            {this.renderSelect('STATE', 'state', 'state', states, 'state')}
            {this.renderTextField('ZIP CODE', 'zip', 'zip', 'postal-code', 'zip-code')}
          </div>

          <div className="profile-form__form-group">
            {this.renderPhoneInput('PHONE', 'phone', 'telephone', 'phone')}
            {this.renderSelect('PHONE TYPE', 'phoneType', 'telephone_use', phoneTypes, 'phone-type')}
          </div>

          <div className="profile-form__form-group">
            {this.renderSelect('RELATIONSHIP', 'relationship', 'relationship', relationshipTypes)}
          </div>

          <div className="profile-form__buttons">
            <Button
              variant="outlined"
              onClick={this.props.cancel}
              className="profile-form__button button-cancel">
              CANCEL
            </Button>

            {showDelete &&
              <Button
                variant="contained"
                onClick={this.deleteProfile}
                className="profile-form__button button-delete">
                DELETE
              </Button>
            }

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="profile-form__button button-save">
              SAVE
            </Button>
          </div>
        </ValidatorForm>
      </div>
    );
  }
}

ProfileForm.propTypes = {
  showDelete: PropTypes.bool,
  saveProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func,
  cancel: PropTypes.func.isRequired
};

ProfileForm.defaultProps = {
  showDelete: true
};
