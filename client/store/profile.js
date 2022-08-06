import axios from 'axios';
import {
  ADD_LIKE_URL,
  getHeaders,
  GET_PERSON_URL,
  REMOVE_LIKE_URL,
} from '../util/constants';

export const state = () => ({
  profile: {
    id: '',
    uuid: '',
    name: '',
    email: '',
    person_followers: [],
    person_followings: [],
    person_stats: {
      id: '',
      person_id: '',
      post_count: 0,
      follower_count: 0,
      following_count: 0,
    },
    person_posts: [],
  },
});

export const getters = {
  profile: (state) => state.profile,
  posts: (state) => state.profile.person_posts,
};

export const actions = {
  /* GET USER PROFILE */
  async getUserProfile({ commit }, { uuid, token }) {
    try {
      const { data: responseData } = await axios.get(
        `${GET_PERSON_URL}/${uuid}`,
        {
          ...getHeaders(token),
        }
      );
      const { data, state, message } = responseData;
      if (state) {
        commit('setProfile', data);
      } else {
        commit('setProfile', null);
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      commit('setProfile', null);
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
        commit('updatePost', data);
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
        commit('updatePost', data);
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
  setProfile(state, profile) {
    state.profile = profile;
  },
  updatePost(state, post) {
    state.profile.person_posts = state.profile.person_posts.map((postItem) => {
      if (Number(postItem?.id) === Number(post?.id)) {
        return { ...post };
      } else {
        return postItem;
      }
    });
  },
};
