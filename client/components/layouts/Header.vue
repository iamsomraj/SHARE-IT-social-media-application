<template>
  <header class="flex items-center justify-between p-4">
    <NuxtLink
      to="/"
      class="flex items-center justify-center space-x-2 rounded px-3 py-2 text-2xl font-extrabold tracking-tighter"
    >
      <span class="text-blue-400">SHARE</span>
      <span class="text-yellow-400">IT</span>
    </NuxtLink>
    <div v-if="!isLoggedIn" class="flex items-center space-x-4 font-bold">
      <NuxtLink to="/register"> Register </NuxtLink>
      <NuxtLink to="/" class="rounded bg-yellow-400 px-3 py-2 text-white">
        Login
      </NuxtLink>
    </div>
    <div v-else class="flex items-center justify-between space-x-4 font-bold">
      <div
        @click="redirectToFeed"
        class="cursor-pointer text-2xl font-bold tracking-tight text-green-500"
      >
        yourfeed
      </div>
      <tertiary-button @onClick="onLogout" class="px-3">
        <template #default> Logout </template>
      </tertiary-button>
    </div>
  </header>
</template>

<script>
import { MESSAGES } from '../../util/constants.js';
import TertiaryButton from '../user-interfaces/TertiaryButton.vue';

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
      this.$store.commit('auth/clear');
      this.$store.commit('profile/setProfile', null);
      this.$router.push('/');
      this.$store.dispatch('toast/success', MESSAGES.LOGOUT_SUCCESS);
    },
    redirectToFeed() {
      this.$router.push('/feed');
    },
  },
  components: { TertiaryButton },
};
</script>

<style lang="scss" scoped></style>
