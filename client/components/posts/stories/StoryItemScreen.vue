<template>
  <div
    class="fixed inset-0 z-20 flex max-h-screen w-screen items-center justify-center bg-white transition-all duration-300 dark:bg-slate-800 dark:text-slate-200"
  >
    <!-- BEGIN: INNER SECTION -->
    <div class="flex h-full w-full flex-col items-center justify-start">
      <!-- BEGIN: HEADER BAR -->
      <div class="flex w-full items-center justify-between px-6 py-6 md:px-12">
        <!-- BEGIN: LEFT SECTION -->
        <div class="cursor-pointer" @click="$emit('dismiss')">
          <!-- BEGIN: LOGO SECTION -->
          <div
            class="flex items-center justify-center space-x-2 rounded text-2xl font-extrabold tracking-tighter"
          >
            <span class="text-blue-400">SHARE</span>
            <span class="text-yellow-400">IT</span>
          </div>
          <!-- END: LOGO SECTION -->
        </div>
        <!-- END: LEFT SECTION -->

        <!-- BEGIN: RIGHT SECTION -->
        <div
          class="cursor-pointer rounded-xl border-2 border-transparent bg-inherit hover:border-2 hover:border-slate-200 dark:hover:border-slate-600"
          @click="$emit('dismiss')"
        >
          <CrossIcon class="m-2 h-6 w-6 stroke-2" />
        </div>
        <!-- END: RIGHT SECTION -->
      </div>
      <!-- END: HEADER BAR -->

      <!-- BEGIN: POST SECTION -->
      <StoryItem
        :selectedPost="selectedPost"
        :selectedStory="selectedStory"
        :postContent="postContent"
        :postAuthor="postAuthor"
        :isLiked="isLiked"
        :loadingPercentage="loadingPercentage"
      />
      <!-- END: POST SECTION -->
    </div>
    <!-- END: INNER SECTION -->
  </div>
</template>

<script>
import CrossIcon from '../../assets/CrossIcon.vue';
import StoryItem from './StoryItem.vue';

export default {
  name: 'StoryItemScreen',
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
    loggedInUserUUID() {
      return this.$store.getters['auth/uuid'];
    },
    selectedPost() {
      return this.posts.find((post) => post.id === this.selectedId);
    },
    selectedStory() {
      return this.selectedPost.post_stories.find((record) => {
        return record.creator.uuid === this.loggedInUserUUID;
      });
    },
    postContent() {
      return this.selectedPost.content;
    },
    postAuthor() {
      return this.selectedPost.creator;
    },
    isLiked() {
      return this.selectedPost.post_likes?.some(
        (likeRecord) => likeRecord?.creator?.uuid === this.loggedInUserUUID
      );
    },
  },
  methods: {
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
  components: { CrossIcon, StoryItem },
};
</script>
0
