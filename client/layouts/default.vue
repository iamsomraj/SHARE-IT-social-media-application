<template>
  <div>
    <Toast />
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Toast from '../components/user-interfaces/Toast.vue';
import Header from '../components/layouts/Header.vue';

export default {
  name: 'DefaultLayout',
  components: { Toast, Header },
};
</script>

<style scoped></style>
