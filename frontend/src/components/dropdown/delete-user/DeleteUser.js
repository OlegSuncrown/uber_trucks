import React from 'react';
import { Dropdown } from 'react-bootstrap';
import ConfirmComponent from '../../confirm-component/ConfirmComponent';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { deleteUserApi } from '../../../api/userApi'

const form = null;
const details = {
  question: 'Do you want delete?',
  actionBtn: 'Delete',
  variant: 'danger'
};

const component = (fn) => {
  return (
    <Dropdown.Item eventKey='2' onClick={fn} className='d-flex align-items-center'>
      <RiDeleteBin7Line className='mr-2 h6 m-0' /><div className="h6 m-0 p-0">Delete Account</div>
    </Dropdown.Item>
  );
};

const DeleteUser = () => {
  const config = {
    form,
    details,
    component,
    api: deleteUserApi,
    tiggerLogout: true,
    successMessage: 'Profile is deleted'
  };
  return <ConfirmComponent config={config} />;
};

export default DeleteUser;
