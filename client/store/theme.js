export const LOCAL_STORAGE_THEME_KEY = 'color-theme';
export const THEMES = Object.freeze({
  DARK: 'dark',
  LIGHT: 'light',
});
export const isOperatingSystemHasDarkMode = () => {
  return window.matchMedia(`(prefers-color-scheme: ${THEMES.DARK})`).matches;
};

export const state = () => ({
  theme: 'dark',
});

export const getters = {
  theme: (state) => state.theme,
  isDarkTheme: (state) => state.theme === THEMES.DARK,
  isLightTheme: (state) => state.theme === THEMES.LIGHT,
};

export const actions = {
  handleTheme({ commit }) {
    if (
      localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === THEMES.DARK ||
      (!(LOCAL_STORAGE_THEME_KEY in localStorage) &&
        isOperatingSystemHasDarkMode())
    ) {
      commit('setTheme', THEMES.DARK);
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, THEMES.DARK);
      document.documentElement.classList.add(THEMES.DARK);
    } else {
      commit('setTheme', THEMES.LIGHT);
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, THEMES.LIGHT);
      document.documentElement.classList.remove(THEMES.DARK);
    }
  },
  toggleTheme({ commit }) {
    // if set via local storage previously
    if (localStorage.getItem(LOCAL_STORAGE_THEME_KEY)) {
      if (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === THEMES.LIGHT) {
        commit('setTheme', THEMES.DARK);
        document.documentElement.classList.add(THEMES.DARK);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, THEMES.DARK);
      } else {
        commit('setTheme', THEMES.LIGHT);
        document.documentElement.classList.remove(THEMES.DARK);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, THEMES.LIGHT);
      }
    } else {
      if (document.documentElement.classList.contains(THEMES.DARK)) {
        document.documentElement.classList.remove(THEMES.DARK);
        commit('setTheme', THEMES.LIGHT);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, THEMES.LIGHT);
      } else {
        document.documentElement.classList.add(THEMES.DARK);
        commit('setTheme', THEMES.DARK);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, THEMES.DARK);
      }
    }
  },
};

export const mutations = {
  setTheme(state, theme) {
    state.theme = theme;
  },
};
