import axios from 'axios';
import {
  ADD_LIKE_URL,
  AUTHORIZE_USER_URL,
  CREATE_POST_URL,
  FOLLOW_URL,
  GET_USER_PROFILE_URL,
  LOCAL_STORAGE_KEYS,
  LOGIN_URL,
  REGISTER_URL,
  REMOVE_LIKE_URL,
  SEARCH_PEOPLE_URL,
  UNFOLLOW_URL,
} from '../util/constants';
import { getHeaders } from '../util/helpers';

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
  /* GET SELF PROFILE */
  async getSelfProfile({ commit }, { uuid, token }) {
    try {
      const { data: responseData } = await axios.get(
        `${GET_USER_PROFILE_URL}/${uuid}`,
        {
          ...getHeaders(token),
        }
      );
      const { data, state, message } = responseData;
      if (state) {
        commit('setUser', data);
      } else {
        commit('clear');
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      commit('clear');
      return { data, state, message };
    }
  },
  /* CHECK AUTH FROM STORAGE */
  async checkAuth({ commit }) {
    try {
      const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN));
      const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USER));
      if (token && user && user.uuid) {
        const payload = { token: token, uuid: user.uuid };
        const { data: responseData } = await axios.post(
          AUTHORIZE_USER_URL,
          payload
        );
        const { state } = responseData;
        if (state) {
          commit('setUser', user);
          commit('setToken', token);
        } else {
          commit('clear');
        }
      }
    } catch (error) {
      commit('clear');
    }
  },
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
        commit('clear');
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      commit('clear');
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
        commit('clear');
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      commit('clear');
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
  /* USER FOLLOW */
  async follow({ commit, state }, uuid) {
    const token = state?.token || '';
    try {
      const { data: responseData } = await axios.post(
        `${FOLLOW_URL}/${uuid}`,
        null,
        {
          ...getHeaders(token),
        }
      );
      const { data, state, message } = responseData;
      if (state) {
        commit('setUser', data);
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      return { data, state, message };
    }
  },
  /* USER UNFOLLOW */
  async unfollow({ commit, state }, uuid) {
    const token = state?.token || '';
    try {
      const { data: responseData } = await axios.post(
        `${UNFOLLOW_URL}/${uuid}`,
        null,
        {
          ...getHeaders(token),
        }
      );
      const { data, state, message } = responseData;
      if (state) {
        commit('setUser', data);
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      return { data, state, message };
    }
  },
  /* USER SEARCH */
  async search({ state }, query) {
    const token = state?.token || '';
    try {
      const { data: responseData } = await axios.post(
        `${SEARCH_PEOPLE_URL}`,
        {
          searchQuery: query,
        },
        {
          ...getHeaders(token),
        }
      );
      const { data, state, message } = responseData;
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
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
  },
  setToken(state, token) {
    state.token = token;
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, JSON.stringify(token));
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
    const blankUser = {
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
    state.user = blankUser;
    state.token = null;
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, '');
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(blankUser));
  },
};
