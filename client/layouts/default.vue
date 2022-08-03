<template>
  <div>
    <Toast />
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Toast from '../components/Toast.vue';
  export default {
    name: "DefaultLayout",
    components: { Toast }
}
</script>

<style scoped>
</style>