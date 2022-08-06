import {
  ADD_LIKE_URL,
  CREATE_POST_URL,
  getHeaders,
  GET_POST_FEED_URL,
  LOGIN_URL,
  REGISTER_URL,
  REMOVE_LIKE_URL,
} from '../util/constants';
import axios from 'axios';

export const state = () => ({
  user: {
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
  token: null,
});

export const getters = {
  isLoggedIn: (state) => state?.token && state?.user?.id && state?.user?.uuid,
  user: (state) => state.user,
  uuid: (state) => state.user.uuid,
  token: (state) => state.token,
  posts: (state) => state.user.person_posts,
  followers: (state) => state.user.person_followers,
  followings: (state) => state.user.person_followings,
  post_count: (state) => state.user.person_stats.post_count,
  follower_count: (state) => state.user.person_stats.follower_count,
  following_count: (state) => state.user.person_stats.following_count,
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
  /* USER POST CREATION */
  async createPost({ commit, state }, { content }) {
    const token = state?.token || '';
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
      const { data, state, message } = responseData;
      if (state) {
        commit('addPost', data);
        commit('incrementPostCount');
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      return { data, state, message };
    }
  },
  /* USER POST LIKE */
  async likePost({ commit, state }, uuid) {
    const token = state?.token || '';
    try {
      const { data: responseData } = await axios.post(
        `${ADD_LIKE_URL}/${uuid}`,
        null,
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
  /* USER POST UNLIKE */
  async unlikePost({ commit, state }, uuid) {
    const token = state?.token || '';
    try {
      const { data: responseData } = await axios.post(
        `${REMOVE_LIKE_URL}/${uuid}`,
        null,
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
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },
  addPost(state, post) {
    state.user.person_posts.push(post);
  },
  updatePost(state, post) {
    state.user.person_posts = state.user.person_posts.map((postItem) => {
      if (Number(postItem?.id) === Number(post?.id)) {
        return { ...post };
      } else {
        return postItem;
      }
    });
  },
  incrementPostCount(state) {
    state.user.person_stats.post_count = state.user.person_stats.post_count + 1;
  },
  clear(state) {
    state.user = {
      id: '',
      uuid: '',
      name: '',
      email: '',
      created_at: '',
      updated_at: '',
      is_deleted: false,
      person_followers: [],
      person_followings: [],
      person_stats: {
        id: '',
        person_id: '',
        follower_count: '',
        following_count: '',
      },
      person_posts: [],
    };
    state.token = null;
  },
};
