export default function ({ store, redirect }) {
  /* WHEN THE USER IS NOT AUTHENTICATED */
  if (!store.getters['auth/isLoggedIn']) {
    return redirect('/')
  }
}
