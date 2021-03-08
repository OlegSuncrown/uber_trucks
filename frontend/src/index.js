import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import UserState from './context/user/UserContext';
import LoadsState from './context/loads/LoadsContext';
ReactDOM.render(
  <>
    <React.StrictMode>
      <Router>
        <UserState>
          <LoadsState>
            <App />
          </LoadsState>
        </UserState>
      </Router>
    </React.StrictMode>
  </>,
  document.getElementById('root')
);
