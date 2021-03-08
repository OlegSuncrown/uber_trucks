import React from 'react';
import ConfirmComponent from '../../../components/confirm-component/ConfirmComponent';
import { MdDelete } from 'react-icons/md';
import { deleteLoadApi } from '../../../api/loadsApi'

const form = null;

const details = {
  question: 'Delete load?',
  actionBtn: 'Delete',
  variant: 'danger'
};

const component = (fn) => {
  return (
    <div className='text-secondary icon h4 p-0 m-0' onClick={fn}>
      <MdDelete />
    </div>
  );
};

const NoteItemDelete = ({ item, setTrigger }) => {
  const config = {
    form,
    details,
    component,
    api: () => deleteLoadApi(item._id),
    successMessage: 'Load is deleted',
    setTrigger
  };

  return <ConfirmComponent config={config} />;
};

export default NoteItemDelete;
