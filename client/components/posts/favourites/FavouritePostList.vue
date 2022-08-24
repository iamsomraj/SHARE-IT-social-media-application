<template>
  <!-- BEGIN: FAVOURITE POST SECTIONS -->
  <div class="flex w-full justify-center md:px-12">
    <div
      class="flex w-full items-start justify-start space-x-2 border-t border-b px-2 py-3 dark:border-slate-600 md:w-1/2 md:rounded-xl md:border md:py-6 md:px-4"
    >
      <!-- BEGIN: SELF FAVOURITE POST ITEM -->
      <div class="flex flex-col items-center justify-center space-y-2 py-2">
        <!-- CIRCLE SECTION -->
        <profile-picture
          :uuid="user.uuid"
          :name="user.name"
          class="h-12 w-12 text-7xl"
        ></profile-picture>

        <!-- NAME SECTION -->
        <div
          @click="$router.push(`/profile/${user.uuid}`)"
          class="w-20 cursor-pointer break-words text-center text-xs font-light text-slate-400 line-clamp-1 hover:underline"
        >
          {{ user.name }}
        </div>
      </div>
      <!-- END: SELF FAVOURITE POST ITEM -->

      <!-- VERTICAL LINE SECTION -->
      <div class="h-full border dark:border-slate-600"></div>

      <FavouriteCard v-if="showCard" @dismiss="showCard = !showCard" />

      <div
        class="flex items-center justify-start space-x-2 overflow-x-auto overscroll-x-contain"
      >
        <!-- BEGIN: FAVOURITE POST ITEM -->
        <div
          v-for="post in favouritePosts"
          :key="post.id"
          class="flex flex-col items-center justify-center space-y-2 py-2"
          @click="showCard = !showCard"
        >
          <!-- CIRCLE SECTION -->
          <profile-picture
            :uuid="post.creator.uuid"
            :name="post.creator.name"
            class="h-12 w-12 text-7xl"
          ></profile-picture>

          <!-- NAME SECTION -->
          <div
            @click="$router.push(`/profile/${post.creator.uuid}`)"
            class="w-20 cursor-pointer break-words text-center text-xs font-light text-slate-400 line-clamp-1 hover:underline"
          >
            {{ post.creator.name }}
          </div>
        </div>
        <!-- END: FAVOURITE POST ITEM -->
      </div>
    </div>
  </div>
  <!-- END: FAVOURITE POST SECTIONS -->
</template>

<script>
import ProfilePicture from '../../persons/ProfilePicture.vue';
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
    };
  },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
  },
  components: {
    ProfilePicture,
    FavouriteCard,
  },
};
</script>
