<template>
  <div class="flex justify-center items-center h-96">
    <RegisterForm />
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
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

<style lang="scss" scoped></style>
