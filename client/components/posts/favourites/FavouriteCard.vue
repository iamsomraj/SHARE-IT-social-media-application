<template>
  <div
    class="fixed inset-0 z-20 flex min-h-screen w-screen items-center justify-center bg-white"
    @click="$emit('dismiss')"
  >
    Hello World
  </div>
</template>

<script>
export default {
  name: 'FavouriteCard',
  emits: ['dismiss'],
};
</script>
