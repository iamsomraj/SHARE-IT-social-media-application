import axios from 'axios';
import { BASE_URL } from '../util/constants';

export const userRegister = async (user) => {
  const { data } = await axios.post(`${BASE_URL}/persons/`, user);
  return data;
};

export const getUserProfile = async (uuid, token) => {
  const { data } = await axios.get(`${BASE_URL}/persons/${uuid}`, {
    headers: {
      Authorization: `Bearer ${token ? token : ''}`,
    },
  });
  return data;
};

export const addLikeToPost = async (uuid, token) => {
  const { data } = await axios.post(`${BASE_URL}/posts/${uuid}`, null, {
    headers: {
      Authorization: `Bearer ${token ? token : ''}`,
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
        Authorization: `Bearer ${token ? token : ''}`,
      },
    }
  );
  return data;
};

export const getUserFeed = async (token) => {
  const { data } = await axios.get(`${BASE_URL}/posts/feed`, {
    headers: {
      Authorization: `Bearer ${token ? token : ''}`,
    },
  });
  return data;
};

export const followPerson = async (uuid, token) => {
  const { data } = await axios.post(`${BASE_URL}/persons/follow/${uuid}`, null, {
    headers: {
      Authorization: `Bearer ${token ? token : ''}`,
    },
  });
  return data;
};

export const getPeople = async (token) => {
  const { data } = await axios.get(`${BASE_URL}/persons/people`, {
    headers: {
      Authorization: `Bearer ${token ? token : ''}`,
    },
  });
  return data;
};

export const getUserData = async (token) => {
  const { data } = await axios.get(`${BASE_URL}/persons/`, {
    headers: {
      Authorization: `Bearer ${token ? token : ''}`,
    },
  });
  return data;
};
