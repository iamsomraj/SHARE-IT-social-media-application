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

export const getUserProfileById = async (id, token) => {
  const { data } = await axios.get(`${BASE_URL}/persons/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const addLikeToPost = async (id, token) => {
  const { data } = await axios.post(`${BASE_URL}/posts/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createPost = async (content, token) => {
  const { data } = await axios.post(
    `${BASE_URL}/posts/create`,
    {
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
