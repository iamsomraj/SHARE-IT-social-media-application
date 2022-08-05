import { CREATE_POST_URL, getHeaders } from '../util/constants';
import axios from 'axios';

export const state = () => ({
  posts: [],
});

export const actions = {
  /* POST CREATION */
  async create({ commit }, { content, token }) {
    try {
      const payload = {
        content,
      };
      const { data: responseData } = await axios.post(
        CREATE_POST_URL,
        payload,
        {
          ...getHeaders(token),
        }
      );
      console.log(
        '🚀 ~ file: post.js ~ line 16 ~ createPost ~ responseData',
        responseData
      );
      const { data, state, message } = responseData;
      if (state) {
        commit('addPost', data);
      } else {
        commit('addPost', null);
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      commit('addPost', null);
      return { data, state, message };
    }
  },
};

export const getters = {};

export const mutations = {
  addPost(state, post) {
    state.posts.push(post);
  },
};
