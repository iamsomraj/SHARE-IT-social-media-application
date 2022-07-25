export const state = () => ({
  user: null,
  token: null,
});

export const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },
};
