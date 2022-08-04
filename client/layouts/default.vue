<template>
  <div>
    <Toast />
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Toast from '../components/user-interface/Toast.vue';
import Header from '../components/layout/Header.vue';

export default {
  name: 'DefaultLayout',
  components: { Toast, Header },
};
</script>

<style scoped></style>
