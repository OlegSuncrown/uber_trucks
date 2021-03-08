import axios from 'axios';

const config = {
  headers: { 'Content-Type': 'application/json' },
};

export const registerUserApi = (userInput) => {
  return axios.post('/api/auth/register', userInput, config);
};

export const loginUserApi = (userInput) => {
  return axios.post(`/api/auth/login`, userInput, config);
};

export const getUserApi = () => {
  return axios.get(`/api/users/me`, config);
};

export const deleteUserApi = () => {
  return axios.delete(`/api/users/me`, config);
};

export const resetPasswordApi = (userInput) => {
  return axios.patch('/api/users/me/password', userInput, config);
};
