import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  // State
  const theme = ref<'light' | 'dark'>('light')

  // Getters
  const isDarkTheme = computed(() => theme.value === 'dark')

  // Actions
  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
    if (process.client) {
      localStorage.setItem('share-it-theme', newTheme)
      updateDocumentClass()
    }
  }

  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const updateDocumentClass = () => {
    if (process.client) {
      if (theme.value === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const initializeTheme = () => {
    if (process.client) {
      const storedTheme = localStorage.getItem('share-it-theme') as
        | 'light'
        | 'dark'
      if (storedTheme) {
        setTheme(storedTheme)
      } else {
        // Check system preference
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches
        setTheme(prefersDark ? 'dark' : 'light')
      }
    }
  }

  return {
    // State
    theme,
    // Getters
    isDarkTheme,
    // Actions
    setTheme,
    toggleTheme,
    initializeTheme,
  }
})
