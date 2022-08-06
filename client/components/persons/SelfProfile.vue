<template>
  <div v-if="isLoggedInUserProfile">
    <!-- BEGIN: CURRENT LOGGED IN USER PROFILE COMPONENT -->
    <div class="w-full">
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
          @onPostCreate="onPostCreate"
          @onPostLike="onPostLike"
          @onUserFollow="onUserFollow"
        />
        <!-- END: CURRENT LOGGED IN USER PROFILE BODY  -->
      </div>
      <!-- END: CURRENT LOGGED IN USER PROFILE COMPONENT MAIN SECTION -->
    </div>
    <!-- END: CURRENT LOGGED IN USER PROFILE COMPONENT -->
  </div>
</template>

<script>
import ProfileBody from '../../components/persons/ProfileBody.vue';
import ProfileHeader from '../../components/persons/ProfileHeader.vue';
import PostCreator from '../../components/posts/PostCreator.vue';

export default {
  name: 'SelfProfile',
  middleware: 'authenticated',
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
    isLoggedInUserProfile() {
      return this.$store.getters['auth/uuid'] === this.$route.params.uuid;
    },
  },
  components: { ProfileBody, ProfileHeader, PostCreator },
};
</script>
