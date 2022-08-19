import axios from 'axios';
import { FETCH_POST_URL } from '../util/constants';
import { getHeaders } from '../util/helpers';

export const state = () => ({
  post: null,
});

export const getters = {
  post: (state) => state.post,
};

export const actions = {
  async fetchPost({ commit }, { uuid, token }) {
    try {
      const { data: responseData } = await axios.get(
        `${FETCH_POST_URL}/${uuid}`,
        {
          ...getHeaders(token),
        }
      );
      const { state, data, message } = responseData;
      if (state) {
        commit('setPost', data);
      } else {
        commit('setPost', null);
      }
      return { state, data, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      commit('setPost', null);
      return { data, state, message };
    }
  },
};

export const mutations = {
  setPost(state, post) {
    state.post = post;
  },
};
