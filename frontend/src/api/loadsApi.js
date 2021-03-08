import axios from 'axios';

const config = {
  headers: { 'Content-Type': 'application/json' },
};

export const getLoadsApi = () => {
  return axios.get(`/api/loads`, config);
};

export const postLoadApi = (id) => {
  return axios.post(`/api/loads/${id}/post`, config);
};

export const deleteLoadApi = (id) => {
  return axios.delete(`/api/loads/${id}`, config);
};

export const createLoadApi = (userInput) => {
  return axios.post(`/api/loads`, userInput, config);
};

export const getLoadByID = (id) => {
  return axios.get(`/api/loads/${id}`, config);
};

export const getShippingInfo = (id) => {
  return axios.get(`/api/loads/${id}/shipping_info`, config);
};

export const getFilteredLoadsApi = (filter) => {
  return axios.get(`/api/loads?filter=${filter}`, config);
};
