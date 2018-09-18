import React from 'react';
import Modal from 'react-modal';

class ConfirmModal extends React.Component {
  render() {
    return (
      <Modal
        id="modal"
        isOpen={!!this.props.isOpen}
        onRequestClose={this.props.onModalClose}
        contentLabel="Selected Option"
        ariaHideApp={false}
        closeTimeoutMS={200}
        className="modal"
      >
        <h3 className="modal__title">{this.props.messageTitle}</h3>
        {this.props.isOpen && (
          <p className="modal__body">{this.props.messageBody}</p>
        )}
        <button
          className="button button--secondary"
          onClick={this.props.onModalOk}
        >
          OK
        </button>
        <button
          className="button button--secondary"
          onClick={this.props.onModalClose}
        >
          Cancel
        </button>
      </Modal>
    );
  }
}

export default ConfirmModal;
