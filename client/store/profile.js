export const state = () => ({
  profile: null,
});

export const getters = {
  getProfile(state) {
    return () => state.profile;
  },
};

export const mutations = {
  setProfile(state, profile) {
    state.profile = profile;
  },
};
