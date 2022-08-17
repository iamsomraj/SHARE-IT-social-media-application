<template>
  <div
    class="min-w-screen flex min-h-screen items-center justify-center dark:bg-slate-800"
  >
    <register-form />
  </div>
</template>

<script>
import RegisterForm from '../../components/user-forms/RegisterForm.vue';
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
  components: { RegisterForm },
};
</script>

<style lang="scss" scoped></style>
