export const state = () => ({
  posts: [],
});

export const getters = {
  getPosts(state) {
    return () => state.posts;
  },
};

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
};
