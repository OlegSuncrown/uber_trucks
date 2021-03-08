import React, { useContext } from 'react';
import { UserContext } from '../../context/user/UserContext';
import { Dropdown } from 'react-bootstrap';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import ResetPassword from './reset-password/ResetPasword';
import DeleteUser from './delete-user/DeleteUser';
const DropdownComponent = () => {
  const { user, logout } = useContext(UserContext);
  return (
    <Dropdown>
      <Dropdown.Toggle variant='outline-dark text-light border-0' id='dropdown-basic'>
        {user ? user.email : 'Loading...'}
      </Dropdown.Toggle>
      <Dropdown.Menu className='px-2'>
        <ResetPassword />
        <DeleteUser />
        <Dropdown.Item eventKey='3' className='d-flex align-items-center' onClick={logout}>
          <RiLogoutBoxRLine className='mr-2 h6 m-0' /><div className="h6 m-0 p-0">Logout</div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComponent;
