import React, { useState } from 'react';
import AlertComponent from '../../components/alert/AlertComponent';
import { Button, Spinner, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { registerUserApi } from '../../api/userApi'

const RegisterPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInput, setuserInput] = useState({
    email: '',
    password: '',
    role: 'SHIPPER'
  });

  const history = useHistory();

  const onChange = (e) => {
    setuserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await registerUserApi(userInput);
      setLoading(false);
      history.push('/login');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-sm-12 col-md-6 mx-auto shadow-sm p-3 py-4'>
          <h2 className='text-center h1'>
            Register
            <br />
            {error && <AlertComponent text={error} />}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='emailID'>Email:</label>
              <input
                onChange={onChange}
                name='email'
                type='text'
                className='form-control'
                id='emailID'
                aria-describedby='email'
                placeholder='Enter email'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='passowrdID'>Password:</label>
              <input
                type='password'
                onChange={onChange}
                className='form-control'
                name='password'
                id='passowrdID'
                placeholder='Password'
              />
            </div>
            <Form.Label className='mr-sm-2' htmlFor='inlineFormCustomSelect'>
              Select your role:
            </Form.Label>
            <Form.Control
              onChange={onChange}
              as='select'
              name='role'
              className='mr-sm-2'
              id='inlineFormCustomSelect'
              custom
            >
              <option value='SHIPPER'>Shipper</option>
              <option value='DRIVER'>Driver</option>
            </Form.Control>
            <div className='text-center'>
              <Button variant='dark px-3 mt-4' disabled={isLoading} type='submit'>
                {isLoading && (
                  <Spinner as='span' className='mr-2' animation='border' size='sm' role='status' aria-hidden='true' />
                )}
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
