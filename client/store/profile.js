export const state = () => ({
  profile: null,
});

export const getters = {
  profile: (state) => state.profile,
};

export const mutations = {
  setProfile(state, profile) {
    state.profile = profile;
  },
};
