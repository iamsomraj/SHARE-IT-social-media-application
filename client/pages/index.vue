<template>
  <div
    class="relative flex max-h-screen min-h-screen w-full items-center justify-center dark:bg-slate-800"
  >
    <theme-button
      class="absolute right-4 top-4 rounded-xl border-2 p-2 dark:border-slate-600"
    />
    <login-form />
  </div>
</template>

<script>
import LoginForm from '../components/user-forms/LoginForm.vue';
import ThemeButton from '../components/user-interfaces/ThemeButton.vue';
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
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn'];
    },
  },
  fetch() {
    if (this.isLoggedIn) {
      this.$router.push('/feed');
    }
  },
  async mounted() {
    await this.$store.dispatch('auth/checkAuth');
    if (this.isLoggedIn) {
      this.$router.push('/feed');
    }
  },
  components: { LoginForm, ThemeButton },
};
</script>
