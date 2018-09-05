import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

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

        <h2>Hello</h2>
        <button onClick={this.props.closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    );
  }
}

ProviderAccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};