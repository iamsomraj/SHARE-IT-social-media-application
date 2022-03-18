export const state = () => ({
  profile: null,
});

export const mutations = {
  setProfile(state, profile) {
    state.profile = profile;
  },
};