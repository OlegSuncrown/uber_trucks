import React from 'react';
import { Dropdown } from 'react-bootstrap';
import ConfirmComponent from '../../confirm-component/ConfirmComponent';
import { RiLockPasswordLine } from 'react-icons/ri';
import { resetPasswordApi } from '../../../api/userApi'

const form = [
  {
    label: 'Old password',
    name: 'oldPassword'
  },

  {
    label: 'New password',
    name: 'newPassword'
  }
];

const details = {
  question: 'Reset password?',
  actionBtn: 'Update',
  variant: 'info'
};

const component = (fn) => {
  return (
    <Dropdown.Item eventKey='1' onClick={fn} className="d-flex align-items-center">
      <RiLockPasswordLine className="mr-2 h6 m-0"/><div className="h6 m-0 p-0">Reset Password</div>
    </Dropdown.Item>
  );
};

const ResetPassword = () => {
  const config = {
    form,
    details,
    component,
    api: resetPasswordApi,
    successMessage: 'Password is updated'
  };

  return <ConfirmComponent config={config} />;
};

export default ResetPassword;
