<template>
  <!-- BEGIN: CURRENT LOGGED IN USER PROFILE COMPONENT -->
  <div class="mt-8 w-full">
    <!-- BEGIN: CURRENT LOGGED IN USER PROFILE COMPONENT MAIN SECTION -->
    <div
      v-if="user"
      class="flex w-full flex-col items-center justify-center space-y-2"
    >
      <!-- BEGIN: CURRENT LOGGED IN USER PROFILE HEADER  -->
      <profile-header
        :uuid="user.uuid"
        :id="user.id"
        :name="user.name"
        :email="user.email"
        :numberOfPosts="user.person_stats.post_count"
        :numberOfFollowers="user.person_stats.follower_count"
        :numberOfFollowings="user.person_stats.following_count"
      />
      <!-- END: CURRENT LOGGED IN USER PROFILE HEADER  -->

      <!-- BEGIN: POST CREATOR -->
      <post-creator />
      <!-- END: POST CREATOR -->

      <!-- BEGIN: CURRENT LOGGED IN USER PROFILE BODY  -->
      <profile-body
        :posts="user.person_posts"
        :name="user.name"
        @onPostLike="onPostLike"
        @onPostUnlike="onPostUnlike"
      />
      <!-- END: CURRENT LOGGED IN USER PROFILE BODY  -->
    </div>
    <!-- END: CURRENT LOGGED IN USER PROFILE COMPONENT MAIN SECTION -->
  </div>
  <!-- END: CURRENT LOGGED IN USER PROFILE COMPONENT -->
</template>

<script>
import ProfileBody from '../../components/persons/ProfileBody.vue';
import ProfileHeader from '../../components/persons/ProfileHeader.vue';
import PostCreator from '../../components/posts/PostCreator.vue';
import { MESSAGES } from '../../util/constants';

export default {
  name: 'SelfProfile',
  middleware: 'authenticated',
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
    token() {
      return this.$store.getters['auth/token'];
    },
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn'];
    },
  },
  methods: {
    async onPostLike(uuid) {
      this.loading = true;
      const res = await this.$store.dispatch('auth/likePost', uuid);
      this.loading = false;
      if (res.state) {
        this.$store.dispatch('toast/success', MESSAGES.POST_LIKE_SUCCESS);
      } else {
        this.$store.dispatch('toast/error', MESSAGES.POST_LIKE_FAILURE);
      }
    },
    async onPostUnlike(uuid) {
      this.loading = true;
      const res = await this.$store.dispatch('auth/unlikePost', uuid);
      this.loading = false;
      if (res.state) {
        this.$store.dispatch('toast/success', MESSAGES.POST_UNLIKE_SUCCESS);
      } else {
        this.$store.dispatch('toast/error', MESSAGES.POST_UNLIKE_FAILURE);
      }
    },
  },
  components: { ProfileBody, ProfileHeader, PostCreator },
};
</script>
