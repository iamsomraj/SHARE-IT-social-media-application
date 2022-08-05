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
          :numberOfPosts="user.person_posts.length"
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
  <div v-else>
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
          :numberOfPosts="profile.person_posts.length"
          :numberOfFollowers="profile.person_followers.length"
          :numberOfFollowings="profile.person_followings.length"
        />
        <!-- END: PROFILE HEADER  -->

        <!-- BEGIN: PERSON FOLLOWER -->
        <user-follower />
        <!-- BEGIN: PERSON FOLLOWER -->

        <!-- BEGIN: PROFILE BODY  -->
        <profile-body
          :posts="profile.person_posts"
          :name="profile.name"
          @onPostCreate="onPostCreate"
          @onPostLike="onPostLike"
          @onUserFollow="onUserFollow"
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
import PostCreator from '../../components/posts/PostCreator.vue';
import {
  addLikeToPost,
  createPost,
  followPerson,
  getUserData,
  getUserProfile,
} from '../../helpers';

export default {
  name: 'ProfileIdPage',
  middleware: 'authenticated',
  computed: {
    profile() {
      return this.$store.getters['profile/profile'];
    },
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
    async onPostCreate(postInput) {
      const newPost = await createPost(postInput, this.token);
      const uuid = this.$router.currentRoute.params.uuid; // GETTING UUID FROM URL
      const fetchedProfile = await getUserProfile(uuid, this.token);
      this.$store.commit('profile/setProfile', fetchedProfile);
    },
    async onPostLike(uuid) {
      await addLikeToPost(uuid, this.token);
      const current_profile_uuid = this.$router.currentRoute.params.uuid; // GETTING UUID FROM URL
      const fetchedProfile = await getUserProfile(
        current_profile_uuid,
        this.token
      );
      this.$store.commit('profile/setProfile', fetchedProfile);
    },
    async onUserFollow(uuid) {
      await followPerson(uuid, this.token);
      const currentPersonUUID = this.$router.currentRoute.params.uuid; // GETTING UUID FROM URL
      const fetchedProfile = await getUserProfile(uuid, this.token);
      const fetchedUser = await getUserData(this.token);
      this.$store.commit('profile/setProfile', fetchedProfile);
      this.$store.commit('auth/setUser', fetchedUser);
      this.$store.commit('auth/setToken', fetchedUser?.token || null);
    },
  },
  components: { ProfileBody, ProfileHeader, PostCreator, UserFollower },
};
</script>

<style scoped></style>
