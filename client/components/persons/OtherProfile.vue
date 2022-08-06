<template>
  <div>
    <!-- BEGIN: PROFILE COMPONENT -->
    <div class="w-full">
      <!-- BEGIN: PROFILE COMPONENT MAIN SECTION -->
      <div
        v-if="profile"
        class="flex w-full flex-col items-center justify-center space-y-2"
      >
        <!-- BEGIN: PROFILE HEADER  -->
        <profile-header
          :uuid="profile.uuid"
          :id="profile.id"
          :name="profile.name"
          :numberOfPosts="profile.person_stats.post_count"
          :numberOfFollowers="profile.person_stats.follower_count"
          :numberOfFollowings="profile.person_stats.following_count"
        />
        <!-- END: PROFILE HEADER  -->

        <!-- BEGIN: PERSON FOLLOWER -->
        <user-follower />
        <!-- BEGIN: PERSON FOLLOWER -->

        <!-- BEGIN: PROFILE BODY  -->
        <profile-body :posts="profile.person_posts" :name="profile.name" />
        <!-- END: PROFILE BODY  -->
      </div>
      <!-- END: PROFILE COMPONENT MAIN SECTION -->
    </div>
    <!-- END: PROFILE COMPONENT -->
  </div>
</template>

<script>
import ProfileBody from '../../components/persons/ProfileBody.vue';
import ProfileHeader from '../../components/persons/ProfileHeader.vue';
import UserFollower from '../../components/persons/UserFollower.vue';

export default {
  name: 'OtherProfile',
  middleware: 'authenticated',
  computed: {
    profile() {
      return this.$store.getters['profile/profile'];
    },
    token() {
      return this.$store.getters['auth/token'];
    },
    isLoggedInUserProfile() {
      return this.$store.getters['auth/uuid'] === this.$route.params.uuid;
    },
  },
  async fetch() {
    /* BEGIN: FETCHING PROFILE DETAIL */
    const uuid = this.$router.currentRoute.params.uuid; // GETTING UUID FROM URL
    await this.$store.dispatch('profile/getUserProfile', {
      uuid,
      token: this.token,
    });
    /* END: FETCHING PROFILE DETAIL */
  },
  components: {
    ProfileBody,
    ProfileHeader,
    UserFollower,
  },
};
</script>
