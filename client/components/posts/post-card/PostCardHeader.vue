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

    <favourite-icon
      v-if="!isPostFavourite"
      class="h-6 w-6 cursor-pointer stroke-slate-400 dark:stroke-slate-600"
      @click="markPostFavourite"
    ></favourite-icon>
    <favourite-icon
      v-else
      class="h-6 w-6 cursor-pointer fill-yellow-400 stroke-yellow-400 dark:fill-yellow-200 dark:stroke-yellow-200"
      @click="markPostUnfavourite"
    ></favourite-icon>
  </div>
  <!-- END: POST CARD HEADER -->
</template>

<script>
import ProfilePicture from '../../persons/ProfilePicture.vue';
import FavouriteIcon from '../../assets/FavouriteIcon.vue';

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
    personPostFavourites: {
      type: Array,
      required: true,
    },
  },
  computed: {
    token() {
      return this.$store.getters['auth/token'];
    },
    loggedInUserUUID() {
      return this.$store.getters['auth/uuid'];
    },
    isPostFavourite() {
      const listOfPersonUUIDsWhoMarkedThisPostAsFavourite =
        this.personPostFavourites.map((fav) => fav.creator.uuid);
      return listOfPersonUUIDsWhoMarkedThisPostAsFavourite.includes(
        this.loggedInUserUUID
      );
    },
  },
  methods: {
    markPostFavourite() {
      const { state } = this.$store.dispatch('posts/favouritePost', {
        postUUID: this.uuid,
        personUUID: this.loggedInUserUUID,
        token: this.token,
      });
      if (state) {
        this.$store.dispatch(
          'toast/success',
          'You marked this post as favourite!'
        );
      } else {
        this.$store.dispatch(
          'toast/error',
          'Failed to mark this post as favourite!'
        );
      }
    },
    markPostUnfavourite() {
      const { state } = this.$store.dispatch('posts/unfavouritePost', {
        postUUID: this.uuid,
        personUUID: this.loggedInUserUUID,
        token: this.token,
      });
      if (state) {
        this.$store.dispatch(
          'toast/success',
          'Your favourite has been removed!'
        );
      } else {
        this.$store.dispatch('toast/error', 'Failed to remove favourite!');
      }
    },
  },
  components: {
    ProfilePicture,
    FavouriteIcon,
  },
};
</script>
