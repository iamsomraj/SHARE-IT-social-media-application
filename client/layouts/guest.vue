<template>
  <div>
    <Toast />
    <Nuxt />
  </div>
</template>

<script>
import Toast from '../components/user-interfaces/Toast.vue';
export default {
  name: 'GuestLayout',
  components: { Toast },
  mounted() {
    this.$store.dispatch('theme/handleTheme');
  },
};
</script>

<style scoped></style>
