import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
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
        className="provider-access-modal"
        overlayClassName="provider-access-modal__overlay">

        <div className="provider-access-modal__header">
          <div className="provider-access-modal__header-title">{this.props.title}</div>
          <div className="provider-access-modal__header-icon"> 
            <FontAwesomeIcon icon="times" onClick={this.props.closeModal} />
          </div>
        </div>

        <div className="provider-access-modal__body">
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </div>
        
        <div className="provider-access-modal__footer"></div>
      </Modal>
    );
  }
}

ProviderAccessModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};