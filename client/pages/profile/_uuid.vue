<template>
  <div>
    <div v-if="profile">
      <ProfileHeader
        :uuid="profile.uuid"
        :id="profile.id"
        :name="profile.name"
        :numberOfPosts="profile.posts.length"
        :numberOfFollowers="profile.followers.length"
        :numberOfFollowings="profile.followings.length"
      />
      <ProfileBody
        :posts="profile.posts"
        :name="profile.name"
        @onPostCreate="onPostCreate"
        @onPostLike="onPostLike"
        @onUserFollow="onUserFollow"
      />
    </div>
  </div>
</template>

<script>
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
  },
  async fetch() {
    /* BEGIN: FETCHING PROFILE DETAIL */
    const uuid = this.$router.currentRoute.params.uuid; // GETTING UUID FROM URL
    const fetchedProfile = await getUserProfile(uuid, this.token);
    this.$store.commit('profile/setProfile', fetchedProfile);
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
};
</script>

<style scoped></style>
