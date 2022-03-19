<template>
  <header class="flex items-center justify-between py-4 px-5">
    <NuxtLink
      to="/"
      class="px-3 py-2 rounded font-extrabold tracking-tighter bg-blue-100 text-blue-400"
      >SHARE IT</NuxtLink
    >
    <div v-if="!isLoggedIn" class="flex items-center space-x-4 font-bold">
      <NuxtLink to="/register">Register</NuxtLink>
      <NuxtLink to="/" class="text-white bg-red-400 px-3 py-2 rounded"
        >Login</NuxtLink
      >
    </div>
    <div v-else class="flex items-center space-x-4 font-bold">
      <div
        @click="onFeed"
        class="text-green-500 tracking-tight text-2xl font-bold"
      >
        yourfeed
      </div>
      <button
        @click="onLogout"
        class="text-white font-bold bg-red-400 px-3 py-2 rounded"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/getUser']() !== null;
    },
    user() {
      return this.$store.getters['auth/getUser']();
    },
  },
  methods: {
    onLogout() {
      this.$store.commit('auth/setUser', null);
      this.$store.commit('profile/setProfile', null);
      this.$router.push('/');
    },
    onFeed() {
      this.$router.push('/feed');
    },
  },
};
</script>

<style lang="scss" scoped></style>
