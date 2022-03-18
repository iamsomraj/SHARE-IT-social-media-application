import axios from 'axios';
import { BASE_URL } from '../util';

export const userLogin = async (user) => {
  const { data } = await axios.post(`${BASE_URL}/persons/auth`, user);
  return data;
};

export const userRegister = async (user) => {
  const { data } = await axios.post(`${BASE_URL}/persons/`, user);
  return data;
};
