import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { LOCAL_STORAGE_KEYS } from '~/utils/constants'

type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>('light')

  const isDarkTheme = computed(() => theme.value === 'dark')

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    if (import.meta.client) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, newTheme)
      updateDocumentClass()
    }
  }

  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const updateDocumentClass = () => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', theme.value === 'dark')
    }
  }

  const initializeTheme = () => {
    if (import.meta.client) {
      const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME)
      if (storedTheme === 'light' || storedTheme === 'dark') {
        setTheme(storedTheme)
      } else {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches
        setTheme(prefersDark ? 'dark' : 'light')
      }
    }
  }

  return {
    theme,

    isDarkTheme,

    setTheme,
    toggleTheme,
    initializeTheme,
  }
})
