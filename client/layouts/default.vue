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

export default {
  name: 'DefaultLayout',
  components: { Toast, Header },
};
</script>

<style scoped></style>
