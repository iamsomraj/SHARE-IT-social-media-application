import { LOGIN_URL } from '../util';
import axios from 'axios';

export const state = () => ({
  user: null,
  token: null,
});

export const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  isLoggedIn: (state) => state.token && state.user,
};

export const actions = {
  /* USER LOGIN */
  async login({ commit }, { email, password }) {
    try {
      const { data: responseData } = await axios.post(LOGIN_URL, {
        email,
        password,
      });
      const { data, state, message } = responseData;
      const response = { data, state, message };
      if (state) {
        commit('setUser', data);
        commit('setToken', data.token);
      } else {
        commit('setUser', null);
        commit('setToken', null);
      }
      return response;
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      const response = { data, state, message };
      commit('setUser', null);
      commit('setToken', null);
      return response;
    }
  },
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },
};
