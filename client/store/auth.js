import axios from 'axios';
import { BASE_URL } from '../util/';

export const state = () => ({
  user: null,
});

export const getters = {
  getUser(state) {
    return () => state.user;
  },
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};