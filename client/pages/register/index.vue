<template>
  <div
    class="relative flex min-h-screen w-screen items-center justify-center dark:bg-slate-800"
  >
    <theme-button
      class="absolute top-4 right-4 rounded-xl border-2 p-2 dark:border-slate-600"
    />
    <register-form />
  </div>
</template>

<script>
import RegisterForm from '../../components/user-forms/RegisterForm.vue';
import ThemeButton from '../../components/user-interfaces/ThemeButton.vue';
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
  async mounted() {
    await this.$store.dispatch('auth/checkAuth');
    if (this.isLoggedIn) {
      this.$router.push('/feed');
    }
  },
  components: { RegisterForm, ThemeButton },
};
</script>

<style lang="scss" scoped></style>
