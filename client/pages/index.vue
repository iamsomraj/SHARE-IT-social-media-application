<template>
  <div class="flex justify-center items-center h-96">
    <LoginForm />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
    token() {
      return this.$store.getters['auth/token'];
    }
  },
  created() {
    if (this.user && this.token) {
      this.$router.push('/feed');
    }
  },
};
</script>
