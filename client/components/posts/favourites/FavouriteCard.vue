<template>
  <div
    class="fixed inset-0 z-20 flex max-h-screen w-screen items-center justify-center bg-white transition-all duration-300 dark:bg-slate-800 dark:text-slate-200"
  >
    <div
      class="absolute top-8 right-8 cursor-pointer rounded-xl border-2 border-transparent hover:border-2 hover:border-slate-200 hover:shadow-md dark:hover:border-slate-600"
      @click="$emit('dismiss')"
    >
      <CrossIcon class="m-2 h-6 w-6 stroke-2" />
    </div>
    {{ posts.find((post) => post.id === selectedId) }}
  </div>
</template>

<script>
import CrossIcon from '../../assets/CrossIcon.vue';
export default {
  name: 'FavouriteCard',
  props: {
    posts: {
      type: Array,
      required: true,
    },
    selectedId: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
  },
  beforeDestroy() {
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
  },
  emits: ['dismiss'],
  components: { CrossIcon },
};
</script>
