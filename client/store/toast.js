export const state = () => ({
  toasts: [],
});

export const getters = {
  toasts: (state) => state.toasts,
};

export const actions = {
  success({ commit, state, dispatch }, message) {
    const id = Date.now() + Math.random();
    commit('setToast', { id, variant: 'success', message });
    setTimeout(() => {
      dispatch('clearToast', id);
    }, 500);
  },
  error({ commit, state, dispatch }, message) {
    const id = Date.now() + Math.random();
    commit('setToast', { id, variant: 'error', message });
    setTimeout(() => {
      dispatch('clearToast', id);
    }, 1000);
  },
  info({ commit, state, dispatch }, message) {
    const id = Date.now() + Math.random();
    commit('setToast', { id, variant: 'info', message });
    setTimeout(() => {
      dispatch('clearToast', id);
    }, 500);
  },
  warning({ commit, state, dispatch }, message) {
    const id = Date.now() + Math.random();
    commit('setToast', { id, variant: 'warning', message });
    setTimeout(() => {
      dispatch('clearToast', id);
    }, 500);
  },
  clearToast({ commit }, id) {
    commit('clearToast', id);
  },
};

export const mutations = {
  setToast(state, { id, variant, message }) {
    state.toasts.push({ id, variant, message });
  },
  clearToast(state, id) {
    state.toasts = state.toasts.filter((toast) => toast.id !== id);
  },
};
