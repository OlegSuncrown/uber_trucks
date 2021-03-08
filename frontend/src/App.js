import React, { useContext } from 'react';
import './bootstrap.min.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from './context/user/UserContext';
import Header from './layouts/header/Header';

import LoginPage from './pages/login-page/LoginPage';
import RegisterPage from './pages/register-page/RegisterPage';
import DashboardPage from './pages/dashboard-page/DashboardPage';

function App() {
  const { isAuthenticated } = useContext(UserContext);
  return (
    <div className='vh-100 d-flex flex-column'>
      <Header />
      <div className='flex-grow-1'>
        <Switch>
          {isAuthenticated && (
            <Route path='/dashboard'>
              <DashboardPage />
            </Route>
          )}

          <Route path='/register'>
            <RegisterPage />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>

          <Route exact path='/'>
            {isAuthenticated ? <Redirect to='/dashboard' /> : <Redirect to='/login' />}
          </Route>
          <Route exact path='/dashboard'>
            {!isAuthenticated && <Redirect to='/login' />}
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
