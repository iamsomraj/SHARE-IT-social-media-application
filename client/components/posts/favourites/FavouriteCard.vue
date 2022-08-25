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
          class="cursor-pointer rounded-xl border-2 border-transparent bg-inherit hover:border-2 hover:border-slate-200 dark:hover:border-slate-600"
          @click="$emit('dismiss')"
        >
          <CrossIcon class="m-2 h-6 w-6 stroke-2" />
        </div>
      </div>
      <div
        class="flex h-3/4 w-full flex-col break-words border-t border-b dark:border-slate-600 md:w-1/4 md:rounded-xl md:border"
      >
        <div class="h-0.5 w-full rounded-full px-4 py-2">
          <div
            class="h-0.5 rounded-full bg-blue-400"
            :style="`width: ${loadingPercentage}%`"
          ></div>
        </div>

        <div
          class="flex items-center justify-start space-x-2 border-b py-4 px-6 dark:border-slate-600"
        >
          <profile-picture
            :uuid="postAuthor.uuid"
            :name="postAuthor.name"
            class="h-8 w-8 text-5xl"
          ></profile-picture>
          <div class="text-sm">
            {{ postAuthor.name }}
          </div>
          <div class="text-sm text-slate-400">
            {{ time(selectedPost.updatedAt, selectedPost.created_at) }}
          </div>
        </div>
        <div class="flex-grow border-b py-4 px-6 dark:border-slate-600">
          {{ postContent }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTime } from '../../../util/helpers';
import CrossIcon from '../../assets/CrossIcon.vue';
import ProfilePicture from '../../persons/ProfilePicture.vue';

export default {
  name: 'FavouriteCard',
  data() {
    return {
      loadingPercentage: 0,
    };
  },
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
    this.setTimer();
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
    postAuthor() {
      return this.selectedPost.creator;
    },
  },
  methods: {
    time(updated_at, created_at) {
      return getTime(updated_at ? updated_at : created_at, true);
    },
    setTimer() {
      const time = 50;
      let i = 0;
      const interval = setInterval(() => {
        i++;
        this.loadingPercentage = i;
        if (i >= 100) {
          clearInterval(interval);
          this.$emit('dismiss');
          return;
        }
      }, time);
    },
  },
  emits: ['dismiss'],
  components: { CrossIcon, ProfilePicture },
};
</script>
0
