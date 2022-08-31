<template>
  <!-- BEGIN: POST CARD HEADER -->
  <div
    class="flex w-full items-center justify-between space-x-4 border-b px-6 py-4 dark:border-slate-600"
  >
    <div class="flex items-center justify-center space-x-4">
      <!-- BEGIN: POST PROFILE PICTURE -->
      <profile-picture
        :uuid="ownerUUID"
        :name="ownerName"
        class="h-8 w-8 shrink-0 text-5xl"
      ></profile-picture>
      <!-- END: POST PROFILE PICTURE -->

      <!-- BEGIN: POST OWNER NAME AND TIME -->
      <div class="flex flex-col items-start justify-center font-bold">
        <!-- BEGIN: POST OWNER NAME -->
        <div
          @click="$router.push(`/profile/${ownerUUID}`)"
          class="cursor-pointer break-words text-3xl text-slate-600 transition-all duration-300 hover:underline dark:text-slate-200"
        >
          {{ ownerName }}
        </div>
        <!-- END: POST OWNER NAME -->

        <!-- BEGIN: POST TIME -->
        <div class="text-sm font-light text-slate-400">{{ time }}</div>
        <!-- END: POST TIME -->
      </div>
      <!-- END: POST OWNER NAME AND TIME -->
    </div>

    <div v-if="!isSelfPost">
      <div
        v-if="!isPostFavourite"
        @click="markPostFavourite"
        class="flex items-center justify-between space-x-2"
      >
        <div
          class="hidden text-xs text-slate-400 underline-offset-4 transition-all duration-300 hover:cursor-pointer hover:underline md:block"
        >
          Add this to your story
        </div>
        <favourite-icon
          class="h-6 w-6 cursor-pointer stroke-slate-400 transition-all duration-300 hover:scale-125 hover:fill-slate-400 dark:stroke-slate-600 hover:dark:fill-slate-600"
        ></favourite-icon>
      </div>
      <div v-else @click="markPostUnfavourite">
        <favourite-icon
          class="h-6 w-6 cursor-pointer fill-yellow-400 stroke-yellow-400 transition-all duration-300 hover:scale-125 dark:fill-yellow-200 dark:stroke-yellow-200"
        ></favourite-icon>
      </div>
    </div>
  </div>
  <!-- END: POST CARD HEADER -->
</template>

<script>
import ProfilePicture from '../../persons/ProfilePicture.vue';
import FavouriteIcon from '../../assets/FavouriteIcon.vue';
import { MESSAGES } from '../../../util/constants';

export default {
  name: 'PostCardHeader',
  props: {
    ownerUUID: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    postStories: {
      type: Array,
      required: true,
    },
  },
  computed: {
    postUUID: function () {
      return this.$route.params.uuid;
    },
    token() {
      return this.$store.getters['auth/token'];
    },
    isSelfPost() {
      return this.ownerUUID === this.$store.getters['auth/uuid'];
    },
    loggedInUserUUID() {
      return this.$store.getters['auth/uuid'];
    },
    isPostFavourite() {
      const listOfPersonUUIDsWhoMarkedThisPostAsFavourite =
        this.postStories.map((fav) => fav.creator.uuid);
      return listOfPersonUUIDsWhoMarkedThisPostAsFavourite.includes(
        this.loggedInUserUUID
      );
    },
  },
  methods: {
    async markPostFavourite() {
      const { state } = await this.$store.dispatch('post/favouritePost', {
        postUUID: this.postUUID,
        token: this.token,
      });
      if (state) {
        this.$store.dispatch('toast/success', MESSAGES.ADD_FAVOURITE_SUCCESS);
      } else {
        this.$store.dispatch('toast/error', MESSAGES.ADD_FAVOURITE_FAILURE);
      }
    },
    async markPostUnfavourite() {
      const { state } = await this.$store.dispatch('post/unfavouritePost', {
        postUUID: this.postUUID,
        token: this.token,
      });
      if (state) {
        this.$store.dispatch(
          'toast/success',
          MESSAGES.REMOVE_FAVOURITE_SUCCESS
        );
      } else {
        this.$store.dispatch('toast/error', MESSAGES.REMOVE_FAVOURITE_FAILURE);
      }
    },
  },
  components: {
    ProfilePicture,
    FavouriteIcon,
  },
};
</script>
