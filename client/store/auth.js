import { LOGIN_URL, REGISTER_URL } from '../util/constants';
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
      if (state) {
        commit('setUser', data);
        commit('setToken', data.token);
      } else {
        commit('setUser', null);
        commit('setToken', null);
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      commit('setUser', null);
      commit('setToken', null);
      return { data, state, message };
    }
  },
  /* USER REGISTER */
  async register({ commit }, { name, email, password }) {
    try {
      const { data: responseData } = await axios.post(REGISTER_URL, {
        name,
        email,
        password,
      });
      const { data, state, message } = responseData;
      if (state) {
        commit('setUser', data);
        commit('setToken', data.token);
      } else {
        commit('setUser', null);
        commit('setToken', null);
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      commit('setUser', null);
      commit('setToken', null);
      return { data, state, message };
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
