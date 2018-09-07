import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Modal extends Component {
  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.handleSaveModal(event);
  }

  render() {
    const { title, submitButtonText, cancelButtonText, handleShowModal, handleCloseModal, children } = this.props;

    return (
      <ReactModal
        contentLabel={title}
        isOpen={handleShowModal}
        onRequestClose={handleCloseModal}
        className="modal"
        overlayClassName="modal__overlay"
        shouldCloseOnOverlayClick={false}>

        <div className="modal__header">
          <div className="modal__heading">{title}</div>

          <div className="modal__buttonbar">
            <button onClick={handleCloseModal} className="modal__button-close" aria-label="close modal">
              <FontAwesomeIcon icon="times" />
            </button>
          </div>
        </div>

        <form onSubmit={this.handleFormSubmit}>
          <div className="modal__body">
            {children}
          </div>

          <footer className="modal__footer">
            {cancelButtonText &&
              <button className="button button-transparent" onClick={handleCloseModal}>{cancelButtonText}</button>
            }

            {submitButtonText && <button type="submit" className="button button-primary">{submitButtonText}</button>}
          </footer>
        </form>
      </ReactModal>
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  handleShowModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleSaveModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};
