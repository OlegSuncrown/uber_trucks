import React from 'react';
import ConfirmComponent from '../../../components/confirm-component/ConfirmComponent';
import { Button } from 'react-bootstrap'
import { deleteTruckApi } from '../../../api/trucksApi'

const form = null;

const details = {
  question: 'Delete Truck?',
  actionBtn: 'Delete',
  variant: 'danger'
};

const DeleteTruck = ({ item, setTrigger }) => {
  // disabled={item.assigned_to}
  const component = (fn) => {
    return (
      <Button variant="link p-0 m-0" onClick={fn}>
        DELETE
      </Button>
    );
  };

  const config = {
    form,
    details,
    component,
    api: () => deleteTruckApi(item._id),
    successMessage: 'Load is deleted',
    setTrigger
  };

  return <ConfirmComponent config={config} />;
};

export default DeleteTruck;
