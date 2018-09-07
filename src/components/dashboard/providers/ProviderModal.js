import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';

import Modal from '../../elements/Modal';

export default class ProviderModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessLevel: 'none',
      sectionAccess: this.getSections()
    };
  }

  getSections = () => {
    return [
      { title: 'Summary', access: 'none' },
      { title: 'Conditions', access: 'none' },
      { title: 'Allergies', access: 'none' },
      { title: 'Medications', access: 'none' },
      { title: 'Immunizations', access: 'none' },
      { title: 'Procedures', access: 'none' },
      { title: 'Labs', access: 'none' },
      { title: 'Vitals', access: 'none' }
    ];
  }

  handleAccessChange = (event) => {
    // TO-DO: change access levels in DB not just state
    this.setState({ accessLevel: event.target.value });
  }

  handleSelectChange = index => event => {
    let sections = this.state.sectionAccess;
    sections[index].access = event.target.value;
    this.setState({ sectionAccess: sections });
  }

  renderRadioButton = (value, label, labelNote) => {
    return (
      <div className="radio-button">
        <FormControlLabel
          className="access-radio"
          label={label}
          control={
            <Radio
              checked={this.state.accessLevel === value}
              onChange={this.handleAccessChange}
              value={value}
              name="access"
              aria-label={value} />
          } />

        {labelNote && <span className="label-note">{labelNote}</span>}
      </div>
    );
  }

  renderSelect = (index, access) => {
    return (
      <Select
        value={access}
        onChange={this.handleSelectChange(index)} >
        <MenuItem key={'none'} value={'none'}>No access</MenuItem>
        <MenuItem key={'view'} value={'view'}>Can view</MenuItem>
        <MenuItem key={'edit'} value={'edit'}>Can edit</MenuItem>
      </Select>
    );
  }

  renderPartialPermissionRow = (section, index) => {
    return (
      <div className="permissions-partial__section" key={index}>
        <div className="permissions-partial__section-title">{section.title}</div>
        <div className="permissions-partial__section-access">{this.renderSelect(index, section.access)}</div>
      </div>
    );
  }

  renderPartialPermissions = () => {
    if (this.state.accessLevel !== 'partial') return null;

    return (
      <div className="permissions-partial">
        {this.state.sectionAccess.map((section, index) => this.renderPartialPermissionRow(section, index))}
      </div>
    );
  }

  render() {
    return (
      <Modal
        title={this.props.title}
        submitButtonText="SAVE"
        cancelButtonText="CANCEL"
        handleShowModal={this.props.isOpen}
        handleCloseModal={this.props.closeModal}
        handleSaveModal={this.props.closeModal}>
        <div className="provider-modal">
          <div className="permissions-title">Custom Permissions</div>

          <div className="permissions-buttons">
            {this.renderRadioButton('none', 'No access')}
            {this.renderRadioButton('full', 'Full access', '(includes full view and edit access)')}
            {this.renderRadioButton('partial', 'Partial access')}
          </div>

          {this.renderPartialPermissions()}
        </div>
      </Modal>
    );
  }
}

ProviderModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};
