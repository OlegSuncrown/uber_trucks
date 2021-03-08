import React from 'react';
import ConfirmComponent from '../../../components/confirm-component/ConfirmComponent';
import { RiCheckFill } from 'react-icons/ri';
import { postLoadApi } from '../../../api/loadsApi'

const form = null;

const details = {
  question: 'Post load?',
  actionBtn: 'Post',
  variant: 'success'
};

const component = (fn) => {
  return (
    <div className='icon h4 m-0 text-secondary' onClick={fn}>
      <RiCheckFill />
    </div>
  );
};

const PostLoad = ({ item, setTrigger }) => {
  const config = {
    form,
    details,
    component,
    api: () => postLoadApi(item._id),
    successMessage: 'Load is posted',
    setTrigger
  };

  return <ConfirmComponent config={config} />;
};

export default PostLoad;
