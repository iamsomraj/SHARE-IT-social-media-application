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
          :email="profile.email"
          :numberOfPosts="profile.person_stats.post_count"
          :numberOfFollowers="profile.person_stats.follower_count"
          :numberOfFollowings="profile.person_stats.following_count"
        />
        <!-- END: PROFILE HEADER  -->

        <!-- BEGIN: PERSON FOLLOWER -->
        <user-follower />
        <!-- BEGIN: PERSON FOLLOWER -->

        <!-- BEGIN: PROFILE BODY  -->
        <profile-body
          :posts="person_posts"
          :name="profile.name"
          @onPostLike="onPostLike"
          @onPostUnlike="onPostUnlike"
        />
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
import { MESSAGES } from '../../util/constants';

export default {
  name: 'OtherProfile',
  middleware: 'authenticated',
  computed: {
    person_posts() {
      return this.$store.getters['profile/posts'];
    },
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
  methods: {
    async onPostLike(uuid) {
      this.loading = true;
      const payload = {
        postUUID: uuid,
        token: this.token,
      };
      const res = await this.$store.dispatch('profile/likePost', payload);
      this.loading = false;
      if (res.state) {
        this.$store.dispatch('toast/success', MESSAGES.POST_LIKE_SUCCESS);
      } else {
        this.$store.dispatch('toast/error', MESSAGES.POST_LIKE_FAILURE);
      }
    },
    async onPostUnlike(uuid) {
      this.loading = true;
      const payload = {
        postUUID: uuid,
        token: this.token,
      };
      const res = await this.$store.dispatch('profile/unlikePost', payload);
      this.loading = false;
      if (res.state) {
        this.$store.dispatch('toast/success', MESSAGES.POST_UNLIKE_SUCCESS);
      } else {
        this.$store.dispatch('toast/error', MESSAGES.POST_UNLIKE_FAILURE);
      }
    },
  },
  components: {
    ProfileBody,
    ProfileHeader,
    UserFollower,
  },
};
</script>
