import React, { useContext, useState, useEffect } from 'react';
import AlertComponent from '../../components/alert/AlertComponent';
import { Button, Spinner } from 'react-bootstrap';
import { UserContext } from '../../context/user/UserContext';
import { Link, useHistory } from 'react-router-dom';
import { loginUserApi } from '../../api/userApi'

const LoginPage = () => {
  const { setLogin, isAuthenticated } = useContext(UserContext);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInput, setuserInput] = useState({
    email: '',
    password: ''
  });

  const history = useHistory();

  // hangle Input
  const onChange = (e) => setuserInput({ ...userInput, [e.target.name]: e.target.value });

  // Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data } = await loginUserApi(userInput)
      setLoading(false);
      setLogin(data.jwt_token);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message || 'error');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-sm-12 col-md-6 mx-auto shadow-sm p-3 py-4'>
          <h2 className='text-center h1'>
            Login
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
            <div className='text-center'>
              <Button variant='dark px-4 mb-2' disabled={isLoading} type='submit'>
                {isLoading && (
                  <Spinner as='span' className='mr-2' animation='border' size='sm' role='status' aria-hidden='true' />
                )}
                Login
              </Button>
              <br />
              <Link to='/register'>Registration</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
