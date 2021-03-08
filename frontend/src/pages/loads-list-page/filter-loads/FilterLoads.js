import React, { useState } from 'react';
import { Button, Spinner, Form, FormControl } from 'react-bootstrap';
import { getFilteredLoadsApi } from '../../../api/loadsApi';

const FilterLoads = ({fetchData, isLoaded}) => {
  const [userInput, setuUserInput] = useState('');
  const onChange = (e) => {
    setuUserInput(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData(() => getFilteredLoadsApi(userInput))
    setuUserInput('')
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='d-flex align-items-center py-3 bg-sec-custom2 px-2  mt-3'>
        <div className='p-0 m-0'>
          <Form.Label srOnly className='mr-sm-2' htmlFor='search'>
            Search
          </Form.Label>
          <FormControl type='text' value={userInput} onChange={onChange} placeholder='Search' className='mr-sm-5' id='search' />
        </div>
        <Button variant='outline-secondary bg-sec-custom px-3 ml-2' disabled={!isLoaded} type='submit'>
          {!isLoaded && <Spinner as='span' className='mr-2' animation='border' size='sm' role='status' aria-hidden='true' />}
          Search
        </Button>
      </form>
    </>
  );
};

export default FilterLoads;
