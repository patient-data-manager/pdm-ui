import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ProviderAccessModal extends Component {
  constructor(props) {
    super(props);

    let state = { 
      accessLevel: 'none',
      sectionAccess: this.getSections()
    };
    this.state = state;
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  getSections = () => {
    return [
      { title: 'Summary', access: 'none' }, 
      { title: 'Conditions', access: 'none' }, 
      { title: 'Allergies', access: 'none' }, 
      { title: 'Medications', access: 'none' }, 
      { title: 'Immunizations', access: 'none' }, 
      { title: 'Proceedures', access: 'none' }, 
      { title: 'Labs', access: 'none' },
      { title: 'Vitals', access: 'none' }
    ];
  }

  handleAccessChange = (event) => {
    // TO-DO: change access levels in DB not just state
    this.setState({ accessLevel: event.target.value });
  }

  renderRadioButton = (value, label) => {
    return (
      <FormControlLabel
        className="access-radio"
        control={
          <Radio
            checked={this.state.accessLevel === value}
            onChange={this.handleAccessChange}
            value={value}
            name="access"
            aria-label={value} />
        }
        label={label} />
    );
  }

  renderPartialPermissionRow = (section, index) => {
    return (
      <div className="permissions-partial__section" key={index}>
        <div className="permissions-partial__section-title">{section.title} </div>
        <div className="permissions-partial__section-access">{section.access} </div>
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
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        className="provider-modal"
        overlayClassName="provider-modal__overlay">

        <div className="provider-modal__header">
          <div className="provider-modal__header-title">{this.props.title}</div>
          <div className="provider-modal__header-icon"> 
            <FontAwesomeIcon icon="times" onClick={this.props.closeModal} />
          </div>
        </div>

        <div className="provider-modal__body">
          <div className="permissions-title">Custom Permissions</div>
          <div className="permissions-buttons">
            {this.renderRadioButton('none', 'No access')}
            {this.renderRadioButton('full', 'Full access (includes full view and edit access)')}
            {this.renderRadioButton('partial', 'Partial access')}
          </div>
          {this.renderPartialPermissions()}
        </div>

        <div className="provider-modal__footer">
          <div className="provider-modal__footer-buttons">
            <Button
              variant="outlined"
              onClick={this.props.closeModal}
              className="provider_modal__footer-button button-cancel">
              CANCEL
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.closeModal}
              // type="submit"
              className="provider_modal__footer-button button-save">
              SAVE
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

ProviderAccessModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};