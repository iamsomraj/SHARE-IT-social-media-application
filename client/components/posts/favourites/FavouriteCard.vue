<template>
  <teleport to="body">
    <div
      class="fixed inset-0 z-20 flex max-h-screen w-screen items-center justify-center bg-white transition-all duration-300 dark:bg-slate-800 dark:text-slate-200"
      @click="$emit('dismiss')"
      :class="{ hidden: !showCard, block: showCard }"
    >
      Hello World
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'FavouriteCard',
  props: {
    showCard: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['dismiss'],
};
</script>
