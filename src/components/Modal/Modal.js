import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Modal, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class LargeImgModal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImg: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImg, tags } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <Modal>
          <img src={largeImg} alt={tags} />
        </Modal>
      </Overlay>,
      modalRoot
    );
  }
}

export default LargeImgModal;
