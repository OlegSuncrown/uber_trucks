import React from 'react';
import { Button, Modal } from 'react-bootstrap';
const ModalResultComponent = ({ setShowModal, showModal, message='Success', variant='success' }) => {
  return (
    <Modal size='md' show={showModal} onHide={() => setShowModal(false)} aria-labelledby='example-modal-sizes-title-sm'>
      <Modal.Header closeButton >
        <Modal.Title id='example-modal-sizes-title-sm' className={`text-${variant} font-weight-normal`}>
          {message}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button variant={`${variant} px-5`} size='md' onClick={() => setShowModal(false)}>
          Ok
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ModalResultComponent;
