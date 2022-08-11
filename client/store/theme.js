export const LOCAL_STORAGE_THEME_KEY = 'color-theme';
export const THEMES = Object.freeze({
  DARK: 'dark',
  LIGHT: 'light',
});

export const state = () => ({
  theme: '',
});

export const getters = {
  theme: (state) => state.theme,
};

export const actions = {
  handleTheme() {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
};

export const mutations = {
  setTheme(state, theme) {
    state.theme = theme;
  },
};
