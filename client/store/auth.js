export const state = () => ({
  isLoggedIn: false,
  user: {
    email: '',
    password: '',
    auth_token: '',
  },
})

export const mutations = {
  login(state, user) {
    state.isLoggedIn = true
    state.user = user
    state.user.auth_token = Math.random().toString()
  },
}
