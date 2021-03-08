import React from 'react';
import ConfirmComponent from '../../../components/confirm-component/ConfirmComponent';
import { assignTruckApi } from '../../../api/trucksApi';
import { Button } from 'react-bootstrap';

const form = null;

const details = {
  question: 'Do you want to assign this truck',
  actionBtn: 'Confirm',
  variant: 'success',
};

const AssignTruck = ({ item, setTrigger }) => {

  const component = (fn) => {
    return(
      <Button variant="link p-0 m-0" disabled={item.assigned_to} onClick={fn}>
        ASSIGN/
      </Button>
    )
  };

  const config = {
    form,
    details,
    component,
    api: () => assignTruckApi(item._id),
    successMessage: 'Load is posted',
    setTrigger,
  };

  return <ConfirmComponent config={config} />;
};

export default AssignTruck;
