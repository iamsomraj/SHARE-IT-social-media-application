<template>
  <header class="flex items-center justify-between py-4 px-5">
    <NuxtLink
      to="/"
      class="rounded bg-blue-100 px-3 py-2 font-extrabold tracking-tighter text-blue-400"
      >SHARE IT</NuxtLink
    >
    <div v-if="!isLoggedIn" class="flex items-center space-x-4 font-bold">
      <NuxtLink to="/register">Register</NuxtLink>
      <NuxtLink to="/" class="rounded bg-red-400 px-3 py-2 text-white"
        >Login</NuxtLink
      >
    </div>
    <div v-else class="flex items-center space-x-4 font-bold">
      <div
        @click="redirectToFeed"
        class="cursor-pointer text-2xl font-bold tracking-tight text-green-500"
      >
        yourfeed
      </div>
      <button
        @click="onLogout"
        class="rounded bg-red-400 px-3 py-2 font-bold text-white"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script>
import { MESSAGES } from '../util/index.js';
export default {
  name: 'Header',
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn'];
    },
    user() {
      return this.$store.getters['auth/user'];
    },
  },
  methods: {
    onLogout() {
      this.$store.commit('auth/setUser', null);
      this.$store.commit('auth/setToken', null);
      this.$store.commit('profile/setProfile', null);
      this.$router.push('/');
      this.$store.dispatch('toast/success', MESSAGES.LOGOUT_SUCCESS);
    },
    redirectToFeed() {
      this.$router.push('/feed');
    },
  },
};
</script>

<style lang="scss" scoped></style>
