import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ProviderAccessModal extends Component {
  componentWillMount() {
    Modal.setAppElement('body');
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
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
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