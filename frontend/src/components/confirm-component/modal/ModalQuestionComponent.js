import React from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';

const ModalQuestionComponent = ({ showModal, setShowModal, form, onChange, handleSubmit, details, isLoading }) => {
  return (
    <Modal size='md' show={showModal} onHide={() => setShowModal(false)} aria-labelledby='example-modal-sizes-title-sm'>
      <Modal.Header closeButton>
        <Modal.Title id='example-modal-sizes-title-sm'>{details.question}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {form && (
            <>
              {form.map((item, i) => {
                return (
                  <div className='form-group' key={i}>
                    <label htmlFor={item.name}>{item.label}</label>
                    <input
                      onChange={onChange}
                      name={item.name}
                      type='text'
                      className='form-control'
                      id={item.name}
                      aria-describedby={item.name}
                      placeholder={item.label}
                    />
                  </div>
                );
              })}
            </>
          )}

          <div className='py-2'></div>

          <Button variant={`${details.variant} px-3`} disabled={isLoading} type='submit'>
            {isLoading && (
              <Spinner as='span' className='mr-2' animation='border' size='sm' role='status' aria-hidden='true' />
            )}
            {details.actionBtn}
          </Button>
          <Button variant='ml-2 secondary' size='md' onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalQuestionComponent;
