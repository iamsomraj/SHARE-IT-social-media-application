<template>
  <div class="flex justify-center items-center min-w-screen min-h-screen">
    <login-form />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  layout: 'guest',
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
    token() {
      return this.$store.getters['auth/token'];
    },
  },
  fetch() {
    if (this.user && this.token) {
      this.$router.push('/feed');
    }
  },
};
</script>
