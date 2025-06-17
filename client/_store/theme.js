import { LOCAL_STORAGE_KEYS } from '../util/constants';

/* BASE THEMES FOR APPLICATION */
export const THEMES = Object.freeze({
  DARK: 'dark',
  LIGHT: 'light',
});

/* FUNCTION TO CHECK IF OS HAS DARK MODE */
export const isOperatingSystemHasDarkMode = () => {
  return window.matchMedia(`(prefers-color-scheme: ${THEMES.DARK})`).matches;
};

export const state = () => ({
  theme: 'dark', // default theme
});

export const getters = {
  theme: (state) => state.theme,
  isDarkTheme: (state) => state.theme === THEMES.DARK,
  isLightTheme: (state) => state.theme === THEMES.LIGHT,
};

export const actions = {
  handleTheme({ commit }) {
    if (
      localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) === THEMES.DARK ||
      (!(LOCAL_STORAGE_KEYS.THEME in localStorage) &&
        isOperatingSystemHasDarkMode())
    ) {
      commit('setTheme', THEMES.DARK);
      localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, THEMES.DARK);
      document.documentElement.classList.add(THEMES.DARK);
    } else {
      commit('setTheme', THEMES.LIGHT);
      localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, THEMES.LIGHT);
      document.documentElement.classList.remove(THEMES.DARK);
    }
  },
  toggleTheme({ commit }) {
    /* IF THEME IS PRESENT IN LOCAL STORAGE */
    if (localStorage.getItem(LOCAL_STORAGE_KEYS.THEME)) {
      /* IF THEME IS LIGHT, SET TO DARK */
      if (localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) === THEMES.LIGHT) {
        commit('setTheme', THEMES.DARK);
        document.documentElement.classList.add(THEMES.DARK);
        localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, THEMES.DARK);
      } else {
        /* IF THEME IS DARK, SET TO LIGHT */
        commit('setTheme', THEMES.LIGHT);
        document.documentElement.classList.remove(THEMES.DARK);
        localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, THEMES.LIGHT);
      }
    } else {
      /* IF THEME IS NOT PRESENT IN LOCAL STORAGE */
      /* IF THEME IS DARK IN HTML TAG, SET TO LIGHT */
      if (document.documentElement.classList.contains(THEMES.DARK)) {
        document.documentElement.classList.remove(THEMES.DARK);
        commit('setTheme', THEMES.LIGHT);
        localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, THEMES.LIGHT);
      } else {
        /* IF NO THEME MENTIONED IN HTML, SET THEME TO DARK */
        document.documentElement.classList.add(THEMES.DARK);
        commit('setTheme', THEMES.DARK);
        localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, THEMES.DARK);
      }
    }
  },
};

export const mutations = {
  setTheme(state, theme) {
    state.theme = theme;
  },
};
