import React, { useState } from 'react';
import AlertComponent from '../../components/alert/AlertComponent';
import { Button, Spinner } from 'react-bootstrap';
import { createLoadApi } from '../../api/loadsApi'

const CreateLoadPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [userInput, setuserInput] = useState({
    name: '',
    payload: '',
    pickup_address: '',
    delivery_address: '',
    dimensions: {
      width: 0,
      length: 0,
      height: 0,
    },
  });

  const onChange = (e) => {
    const key = e.target.name;
    if (key === 'width' || key === 'height' || key === 'length') {
      const dimensions = { ...userInput.dimensions, [key]: +e.target.value };
      setuserInput({ ...userInput, dimensions });
    } else if (key === 'payload') {
      setuserInput({ ...userInput, [key]: +e.target.value });
    } else {
      setuserInput({ ...userInput, [key]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      await createLoadApi(userInput)
      setMessage('Load is created');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className='container'>
      <h2 className='text-center h1'>
        Create Load
        <br />
        {error && <AlertComponent text={error} />}
        {message && <AlertComponent text={message} variant='success' />}
      </h2>
      <div className='row'>
        <div className='col-12 border py-3'>
          <form onSubmit={handleSubmit}>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label htmlFor='namelID'>Name:</label>
                    <input
                      onChange={onChange}
                      name='name'
                      type='text'
                      className='form-control'
                      id='nameID'
                      aria-describedby='email'
                      placeholder='Name...'
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label htmlFor='payloaddID'>Payload:</label>
                    <input
                      type='number'
                      onChange={onChange}
                      className='form-control'
                      name='payload'
                      id='payloadID'
                      placeholder='payload...'
                    />
                  </div>
                </div>
                <div className='col-12'>
                  <div className='form-group'>
                    <label htmlFor='pickup_addressID'>Pickup address:</label>
                    <input
                      type='text'
                      onChange={onChange}
                      className='form-control'
                      name='pickup_address'
                      id='pickup_addressID'
                      placeholder='pickup address...'
                    />
                  </div>
                </div>
                <div className='col-12'>
                  <div className='form-group'>
                    <label htmlFor='delivery_addressID'>Delivery address:</label>
                    <input
                      type='text'
                      onChange={onChange}
                      className='form-control'
                      name='delivery_address'
                      id='delivery_addressID'
                      placeholder='delivery address...'
                    />
                  </div>
                </div>
                <div className='col-4'>
                  <div className='form-group'>
                    <label htmlFor='widthID'>Width:</label>
                    <input
                      type='number'
                      onChange={onChange}
                      className='form-control'
                      name='width'
                      id='widthID'
                      placeholder='width...'
                    />
                  </div>
                </div>
                <div className='col-4'>
                  <div className='form-group'>
                    <label htmlFor='heightID'>Height:</label>
                    <input
                      type='number'
                      onChange={onChange}
                      className='form-control'
                      name='height'
                      id='heightID'
                      placeholder='height...'
                    />
                  </div>
                </div>
                <div className='col-4'>
                  <div className='form-group'>
                    <label htmlFor='lengthID'>length:</label>
                    <input
                      type='number'
                      onChange={onChange}
                      className='form-control'
                      name='length'
                      id='lengthID'
                      placeholder='length...'
                    />
                  </div>
                </div>
                <div className='col-12 text-center'>
                  <Button variant='outline-dark px-5 mt-4' block disabled={isLoading} type='submit'>
                    {isLoading && (
                      <Spinner as='span' className='mr-2' animation='border' size='sm' role='status' aria-hidden='true' />
                    )}
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLoadPage;
