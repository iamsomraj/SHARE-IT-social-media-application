<template>
  <div>
    <Toast />
    <Nuxt />
  </div>
</template>

<script>
import Toast from '../components/Toast.vue';
export default {
  name: 'GuestLayout',
  components: { Toast },
};
</script>

<style scoped></style>
