import axios from 'axios';
import {
  ADD_LIKE_URL,
  GET_STORY_POSTS_URL,
  GET_POST_FEED_URL,
  REMOVE_LIKE_URL,
} from '../util/constants';
import { getHeaders } from '../util/helpers';

export const state = () => ({
  posts: [],
  storyPosts: [],
});

export const getters = {
  posts: (state) => state.posts,
  storyPosts: (state) => state.storyPosts,
};

export const actions = {
  /* FETCH POSTS FOR FEED */
  async posts({ commit }, token) {
    try {
      const { data: responseData } = await axios.get(`${GET_POST_FEED_URL}`, {
        ...getHeaders(token),
      });
      const { data, state, message } = responseData;
      if (state) {
        commit('setPosts', data);
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      return { data, state, message };
    }
  },
  /* FETCH STORY POSTS */
  async storyPosts({ commit }, token) {
    try {
      const { data: responseData } = await axios.get(
        `${GET_STORY_POSTS_URL}`,
        {
          ...getHeaders(token),
        }
      );
      const { data, state, message } = responseData;
      if (state) {
        commit('setFavouritePosts', data);
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      return { data, state, message };
    }
  },
  /* LIKE FEED POST */
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
  /* UNLIKE FEED POST */
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
  setFavouritePosts(state, posts) {
    state.storyPosts = posts;
  },
  setPosts(state, posts) {
    state.posts = posts;
  },
  updatePost(state, post) {
    state.posts = state.posts.map((postItem) => {
      if (Number(postItem?.id) === Number(post?.id)) {
        return { ...post };
      } else {
        return postItem;
      }
    });
  },
};
