import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
const AlertComponent = ({ text, variant = 'danger' }) => {
  const [show, setShow] = useState(true);
  return (
    <Alert variant={variant} show={show} onClose={() => setShow(false)} dismissible className='my-3'>
      <div className='py-1'>{text}</div>
    </Alert>
  );
};

export default AlertComponent;
