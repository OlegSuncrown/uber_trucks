import React, { useState, createContext, useEffect } from 'react';
import setAuthToken from '../../utils/setAuthToken';
import { getUserApi } from '../../api/userApi';
import { useHistory } from 'react-router-dom';
export const UserContext = createContext();

const UserState = (props) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('AuthToken');
    setUser(null);
    setIsAuthenticated(false);
    history.push('/login');
  };

  // Login user
  const loadUser = async () => {
    try {
      const {
        data: { user },
      } = await getUserApi();
      setUser(user);
    } catch {
      logout();
    }
  };

  // Set data if login
  const setLogin = (token) => {
    setAuthToken(token);
    localStorage.setItem('AuthToken', token);
    setIsAuthenticated(true);
  };

  // Get user data after pager reload
  useEffect(() => {
    if (localStorage.AuthToken) {
      setAuthToken(localStorage.AuthToken);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
    }
  }, [isAuthenticated]);

  const value = {
    isAuthenticated,
    setLogin,
    user,
    logout,
    loadUser,
  };

  return (
    <UserContext.Provider
      value={value}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
