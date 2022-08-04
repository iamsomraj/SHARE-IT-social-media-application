<template>
  <div class="min-w-screen flex min-h-screen items-center justify-center">
    <register-form />
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
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

<style lang="scss" scoped></style>
