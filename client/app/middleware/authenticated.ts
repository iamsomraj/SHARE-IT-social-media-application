export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()

  /* WHEN THE USER IS NOT AUTHENTICATED */
  if (!authStore.isLoggedIn) {
    return navigateTo('/')
  }
})
