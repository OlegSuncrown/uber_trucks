import React, { useContext } from 'react';
import { UserContext } from '../../context/user/UserContext';

import { NavLink } from 'react-router-dom';
import DropdownComponent from '../../components/dropdown/DropdownComponent'

const Header = () => {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <header>
      <nav className='navbar navbar-dark bg-dark py-2 mb-3'>
        <div className='container'>
          <NavLink className='navbar-brand' to='/dashboard' exact>
            Node
          </NavLink>

          <ul className='navbar-nav flex-row align-items-center'>
            {!isAuthenticated ? (
              <>
                <li className='nav-item mr-2'>
                  <NavLink to='/login' className='nav-link'>
                    Login
                  </NavLink>
                </li>

                <li className='nav-item'>
                  <NavLink className='nav-link' to='/register'>
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <DropdownComponent/>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
