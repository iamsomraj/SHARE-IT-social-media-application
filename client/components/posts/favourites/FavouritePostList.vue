<template>
  <!-- BEGIN: FAVOURITE POST SECTIONS -->
  <div class="flex w-full justify-center md:px-12">
    <!-- BEGIN: FAVOURITE CARD -->
    <FavouriteCard
      v-if="showCard"
      @dismiss="onCardClose"
      :posts="favouritePosts"
      :selectedId="selectedId"
    />
    <!-- END: FAVOURITE CARD -->

    <!-- BEGIN: ROOT LIST SECTION -->
    <div
      class="flex w-full items-start justify-start space-x-2 border-t border-b px-2 py-3 dark:border-slate-600 md:w-1/2 md:rounded-xl md:border md:py-6 md:px-4"
    >
      <!-- BEGIN: OTHER FAVOURITE POST ITEMS SECTION -->
      <div
        class="flex items-center justify-start space-x-2 overflow-x-auto overscroll-x-contain scroll-smooth no-scrollbar"
      >
        <!-- BEGIN: FAVOURITE POST ITEM -->
        <div
          v-for="post in favouritePosts"
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
        <!-- END: FAVOURITE POST ITEM -->
      </div>
      <!-- END: OTHER FAVOURITE POST ITEMS SECTION -->
    </div>
    <!-- END: ROOT LIST SECTION -->
  </div>
  <!-- END: FAVOURITE POST SECTIONS -->
</template>

<script>
import FavouriteCard from './FavouriteCard.vue';

export default {
  name: 'FavouritePostList',
  props: {
    favouritePosts: {
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
    FavouriteCard,
  },
};
</script>
