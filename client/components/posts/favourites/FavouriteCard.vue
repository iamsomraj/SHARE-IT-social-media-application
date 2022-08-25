<template>
  <div
    class="fixed inset-0 z-20 flex max-h-screen w-screen items-center justify-center bg-white transition-all duration-300 dark:bg-slate-800 dark:text-slate-200"
  >
    <div class="flex h-full w-full flex-col items-center justify-start">
      <div class="flex w-full items-center justify-between px-6 py-6 md:px-12">
        <div class="cursor-pointer" @click="$emit('dismiss')">
          <div
            class="flex items-center justify-center space-x-2 rounded text-2xl font-extrabold tracking-tighter"
          >
            <span class="text-blue-400">SHARE</span>
            <span class="text-yellow-400">IT</span>
          </div>
        </div>
        <div
          class="cursor-pointer rounded-xl border-2 border-transparent bg-inherit hover:border-2 hover:border-slate-200 hover:shadow-md dark:hover:border-slate-600"
          @click="$emit('dismiss')"
        >
          <CrossIcon class="m-2 h-6 w-6 stroke-2" />
        </div>
      </div>
      <div class="w-full break-words px-6 md:w-1/4">
        {{ postContent }}
      </div>
    </div>
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
  computed: {
    selectedPost() {
      return this.posts.find((post) => post.id === this.selectedId);
    },
    postContent() {
      return this.selectedPost.content;
    },
  },
  emits: ['dismiss'],
  components: { CrossIcon },
};
</script>
