import axios from 'axios';
import {
  ADD_STORY_URL,
  ADD_LIKE_URL,
  FETCH_POST_URL,
  REMOVE_STORY_URL,
  REMOVE_LIKE_URL,
} from '../util/constants';
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
  /* LIKE OTHER USER POST */
  async likePost({ commit }, { postUUID, token }) {
    try {
      const { data: responseData } = await axios.post(
        `${ADD_LIKE_URL}/${postUUID}`,
        {},
        {
          ...getHeaders(token),
        }
      );
      const { data, state, message } = responseData;
      if (state) {
        commit('setPost', data);
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      return { data, state, message };
    }
  },
  /* UNLIKE OTHER USER POST */
  async unlikePost({ commit }, { postUUID, token }) {
    try {
      const { data: responseData } = await axios.post(
        `${REMOVE_LIKE_URL}/${postUUID}`,
        {},
        {
          ...getHeaders(token),
        }
      );
      const { data, state, message } = responseData;
      if (state) {
        commit('setPost', data);
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      return { data, state, message };
    }
  },
  /* MARK POST AS STORY */
  async favouritePost({ commit }, { postUUID, token }) {
    try {
      const { data: responseData } = await axios.post(
        `${ADD_STORY_URL}/${postUUID}`,
        {},
        {
          ...getHeaders(token),
        }
      );
      const { data, state, message } = responseData;
      if (state) {
        commit('setPost', data);
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      return { data, state, message };
    }
  },
  /* UNMARK POST AS STORY */
  async unfavouritePost({ commit }, { postUUID, token }) {
    try {
      const { data: responseData } = await axios.post(
        `${REMOVE_STORY_URL}/${postUUID}`,
        {},
        {
          ...getHeaders(token),
        }
      );
      const { data, state, message } = responseData;
      if (state) {
        commit('setPost', data);
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      return { data, state, message };
    }
  },
};

export const mutations = {
  setPost(state, post) {
    state.post = post;
  },
};
