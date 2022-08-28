<template>
  <!-- BEGIN: STORY POST SECTIONS -->
  <div class="flex w-full justify-center md:px-12">
    <!-- BEGIN: STORY CARD -->
    <story-item-screen
      v-if="showCard"
      @dismiss="onCardClose"
      :posts="storyPosts"
      :selectedId="selectedId"
    ></story-item-screen>
    <!-- END: STORY CARD -->

    <!-- BEGIN: ROOT LIST SECTION -->
    <div
      class="flex w-full items-start justify-start space-x-2 border-t border-b px-2 py-3 dark:border-slate-600 md:w-1/2 md:rounded-xl md:border md:py-6 md:px-4"
    >
      <!-- BEGIN: OTHER STORY POST ITEMS SECTION -->
      <div
        class="flex items-center justify-start space-x-2 overflow-x-auto overscroll-x-contain scroll-smooth no-scrollbar"
      >
        <!-- BEGIN: STORY POST ITEM -->
        <div
          v-for="post in storyPosts"
          :key="post.id"
          class="flex flex-col items-center justify-center space-y-2 py-2 transition-all duration-300 hover:scale-105"
          @click="onPostClick(post.id)"
        >
          <!-- CIRCLE SECTION -->
          <div
            class="flex h-12 w-12 rotate-45 cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-yellow-400 text-center text-7xl font-extrabold capitalize text-white shadow-inner transition-all duration-300 dark:border-none"
          >
            {{ post.creator.name[0] }}
          </div>

          <!-- NAME SECTION -->
          <div
            class="text-xsF w-20 cursor-pointer break-words text-center text-sm text-slate-400 line-clamp-1 hover:underline"
          >
            {{ post.creator.name }}
          </div>
        </div>
        <!-- END: STORY POST ITEM -->
      </div>
      <!-- END: OTHER STORY POST ITEMS SECTION -->
    </div>
    <!-- END: ROOT LIST SECTION -->
  </div>
  <!-- END: STORY POST SECTIONS -->
</template>

<script>
import StoryItemScreen from './StoryItemScreen.vue';

export default {
  name: 'StoryList',
  props: {
    storyPosts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showCard: false,
      selectedId: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
  },
  methods: {
    onPostClick(id) {
      this.showCard = true;
      this.selectedId = id;
    },
    onCardClose() {
      this.showCard = false;
      this.selectedId = null;
    },
  },
  components: {
    StoryItemScreen,
  },
};
</script>
