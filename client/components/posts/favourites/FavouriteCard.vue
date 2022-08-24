<template>
  <div
    class="fixed inset-0 z-20 flex max-h-screen w-screen items-center justify-center bg-white transition-all duration-300 dark:bg-slate-800 dark:text-slate-200"
    @click="$emit('dismiss')"
  >
    Hello World
  </div>
</template>

<script>
export default {
  name: 'FavouriteCard',
  emits: ['dismiss'],
  mounted() {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
  },
  beforeDestroy() {
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
  },
};
</script>
