/**
 * Restores the persisted session before the first navigation,
 * so route middleware sees the logged-in state on hard refresh.
 */
export default defineNuxtPlugin(() => {
  useAuthStore().initializeAuth()
})
