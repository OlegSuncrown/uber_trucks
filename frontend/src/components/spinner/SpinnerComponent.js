import React from 'react';
import { Spinner } from 'react-bootstrap';

const SpinnerComponent = () => {
  return (
    <div className='text-center my-5 w-100'>
      <Spinner animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default SpinnerComponent;
