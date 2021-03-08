import React, { useState } from 'react';
import { Button, Spinner, Form } from 'react-bootstrap';
import { createTruckApi } from '../../../api/trucksApi';
import AlertComponent from '../../../components/alert/AlertComponent';
const truckType = {
  SPRINTER: 'SPRINTER',
  SMALL_STRAIGHT: 'SMALL STRAIGHT',
  LARGE_STRAIGHT: 'LARGE STRAIGHT',
};

const AddTruck = ({ setTrigger }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInput, setuserInput] = useState({
    type: truckType.SPRINTER,
  });

  const onChange = (e) => {
    setuserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createTruckApi(userInput);
      setLoading(false);
      setTrigger(true)
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message || 'error');
    }
  };

  return (
    <>
      {error && <AlertComponent text={error} />}
      <form onSubmit={handleSubmit} className='d-flex align-items-center py-3 bg-sec-custom2 px-2  mt-3'>
        <div className='p-0 m-0'>
          <Form.Label srOnly className='mr-sm-2' htmlFor='inlineFormCustomSelect'>
            ADD NEW TRUCK:
          </Form.Label>
          <Form.Control onChange={onChange} as='select' name='type' className='mr-sm-5' id='inlineFormCustomSelect' custom>
            <option value={truckType.SPRINTER}>{truckType.SPRINTER}</option>
            <option value={truckType.SMALL_STRAIGHT}>{truckType.SMALL_STRAIGHT}</option>
            <option value={truckType.LARGE_STRAIGHT}>{truckType.LARGE_STRAIGHT}</option>
          </Form.Control>
        </div>
        <Button variant='outline-secondary bg-sec-custom px-3 ml-2' disabled={isLoading} type='submit'>
          {isLoading && <Spinner as='span' className='mr-2' animation='border' size='sm' role='status' aria-hidden='true' />}
          ADD TRUCK
        </Button>
      </form>
    </>
  );
};

export default AddTruck;
