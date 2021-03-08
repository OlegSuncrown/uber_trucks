import React, { useState, useContext } from 'react';
import ModalQuestionComponent from './modal/ModalQuestionComponent';
import ModalResultComponent from './alert-modal/ModalResultComponent';
import { UserContext } from '../../context/user/UserContext';

const ConfirmComponent = ({ config }) => {
  const { form, details, component, tiggerLogout, api, successMessage, setTrigger } = config;
  const { logout } = useContext(UserContext);

  // Cteate state for use input
  const createStateUserInput = (params) => {
    if (params) {
      const state = {};
      params.forEach((item) => {
        state[item.name] = '';
      });
      return state;
    }
    return null;
  };

  // Show modal with question
  const [showModalQuestion, setShowModalQuestion] = useState(false);

  // Show modal with success or error
  const [showModalResult, setShowModalResult] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [color, setColor] = useState(null);
  const [message, setMessage] = useState(false);
  const [userInput, setUserInput] = useState(createStateUserInput(form));

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const resetPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api(userInput)
      setLoading(false);

      // Close form modal window
      setShowModalQuestion(false);

      // Open window with result message
      setShowModalResult(true);

      // Set result message
      setMessage(successMessage);

      // set color for success result window
      setColor('success');

      // Trigger refetch all notes
      if(setTrigger) {
        setTrigger(true)
      }

      // If delete user, fire logout()
      if (tiggerLogout) {
        logout();
      }
    } catch (error) {
      setLoading(false);

      // Close form modal window
      setShowModalQuestion(false);

      // Open window with result message
      setShowModalResult(true);

      // Set result message with error
      setMessage(error.response.data.message || 'Error');

      // set color for ModalAlert
      setColor('danger');
    } finally {
      // reset user input
      setUserInput(createStateUserInput(form));
    }
  };

  return (
    <>
      <ModalQuestionComponent
        showModal={showModalQuestion}
        setShowModal={setShowModalQuestion}
        form={form}
        onChange={handleChange}
        handleSubmit={resetPasswordSubmit}
        details={details}
        isLoading={isLoading}
      />
      <ModalResultComponent
        showModal={showModalResult}
        setShowModal={setShowModalResult}
        message={message}
        variant={color}
      />
      {component(() => setShowModalQuestion(true))}
    </>
  );
};

export default ConfirmComponent;
