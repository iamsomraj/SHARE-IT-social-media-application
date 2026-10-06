export default defineNuxtRouteMiddleware(() => {
  // The session lives in localStorage, so it can only be checked on the client.
  if (import.meta.server) {
    return
  }

  if (!useAuthStore().isLoggedIn) {
    return navigateTo('/')
  }
})
