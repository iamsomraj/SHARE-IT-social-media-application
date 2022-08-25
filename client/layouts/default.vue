<template>
  <div>
    <Toast />
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from '../components/app-layouts/Header.vue';
import Toast from '../components/user-interfaces/Toast.vue';
import { LOCAL_STORAGE_KEYS } from '../util/constants';

export default {
  name: 'DefaultLayout',
  components: { Toast, Header },
  mounted() {
    this.$store.dispatch('theme/handleTheme');
    setInterval(() => {
      const tokenFromStorage = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
      if (
        !tokenFromStorage &&
        this.$route.path !== '/' &&
        this.$route.path !== '/register'
      ) {
        this.$router.push('/');
      }
    }, 1000);
  },
};
</script>
