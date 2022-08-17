<template>
  <div
    class="flex min-h-screen w-screen items-center justify-center dark:bg-slate-800"
  >
    <login-form />
  </div>
</template>

<script>
import LoginForm from '../components/user-forms/LoginForm.vue';
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
  mounted() {
    this.$store.dispatch('auth/checkAuth');
    if (this.isLoggedIn) {
      this.$router.push('/feed');
    }
  },
  components: { LoginForm },
};
</script>
