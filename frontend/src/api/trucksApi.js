import axios from 'axios';

const config = {
  headers: { 'Content-Type': 'application/json' },
};

const URL = '/api/trucks'

export const getTrucksApi = () => {
  return axios.get(URL, config);
};

export const createTruckApi = (userInput) => {
  return axios.post(URL, userInput, config);
};

export const assignTruckApi = (id) => {
  return axios.post(`${URL}/${id}/assign`, config);
};

export const deleteTruckApi = (id) => {
  return axios.delete(`${URL}/${id}`, config);
};