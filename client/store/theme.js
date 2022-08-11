export const LOCAL_STORAGE_THEME_KEY = 'color-theme';
export const THEMES = Object.freeze({
  DARK: 'dark',
  LIGHT: 'light',
});
export const isOperatingSystemHasDarkMode = () => {
  return window.matchMedia(`(prefers-color-scheme: ${THEMES.DARK})`).matches;
};

export const state = () => ({
  theme: '',
});

export const getters = {
  theme: (state) => state.theme,
  isDarkTheme: (state) => state.theme === THEMES.DARK,
  isLightTheme: (state) => state.theme === THEMES.LIGHT,
};

export const actions = {
  handleTheme() {
    if (
      localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === THEMES.DARK ||
      (!(LOCAL_STORAGE_THEME_KEY in localStorage) &&
        isOperatingSystemHasDarkMode())
    ) {
      document.documentElement.classList.add(THEMES.DARK);
    } else {
      document.documentElement.classList.remove(THEMES.DARK);
    }
  },
  setTheme({ commit }, theme) {
    var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    var themeToggleLightIcon = document.getElementById(
      'theme-toggle-light-icon'
    );

    // Change the icons inside the button based on previous settings
    if (
      localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === THEMES.DARK ||
      (!(LOCAL_STORAGE_THEME_KEY in localStorage) &&
        isOperatingSystemHasDarkMode())
    ) {
      themeToggleLightIcon.classList.remove('hidden');
    } else {
      themeToggleDarkIcon.classList.remove('hidden');
    }

    var themeToggleBtn = document.getElementById('theme-toggle');

    themeToggleBtn.addEventListener('click', function () {
      // toggle icons inside button
      themeToggleDarkIcon.classList.toggle('hidden');
      themeToggleLightIcon.classList.toggle('hidden');

      // if set via local storage previously
      if (localStorage.getItem(LOCAL_STORAGE_THEME_KEY)) {
        if (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === THEMES.LIGHT) {
          document.documentElement.classList.add(THEMES.DARK);
          localStorage.setItem(LOCAL_STORAGE_THEME_KEY, THEMES.DARK);
        } else {
          document.documentElement.classList.remove(THEMES.DARK);
          localStorage.setItem(LOCAL_STORAGE_THEME_KEY, THEMES.LIGHT);
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains(THEMES.DARK)) {
          document.documentElement.classList.remove(THEMES.DARK);
          localStorage.setItem(LOCAL_STORAGE_THEME_KEY, THEMES.LIGHT);
        } else {
          document.documentElement.classList.add(THEMES.DARK);
          localStorage.setItem(LOCAL_STORAGE_THEME_KEY, THEMES.DARK);
        }
      }
    });
    commit('setTheme', theme);
  },
};

export const mutations = {
  setTheme(state, theme) {
    state.theme = theme;
  },
};
