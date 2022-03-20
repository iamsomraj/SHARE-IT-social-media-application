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
      return this.$store.getters['auth/getUser']();
    },
  },
  created() {
    if (this.user && this.user.token) {
      this.$router.push('/feed');
    }
  },
};
</script>
