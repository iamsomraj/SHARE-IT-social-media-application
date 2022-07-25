<template>
  <div>
    <div v-if="profile">
      <ProfileHeader
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
  getUserProfileById,
} from '../../helpers';
export default {
  name: 'ProfileIdPage',
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
  },
  created() {
    if (!this.user) {
      this.$router.push('/');
    }
  },
  async fetch() {
    /**
     * fetching user detail
     */
    const id = parseInt(this.$router.currentRoute.params.id); // getting id from url
    const fetchedProfile = await getUserProfileById(id, this.token);
    this.$store.commit('profile/setProfile', fetchedProfile);
    console.log("🚀 ~ file: _id.vue ~ line 55 ~ fetch ~ fetchedProfile", fetchedProfile);
  },
  methods: {
    async onPostCreate(postInput) {
      const newPost = await createPost(postInput, this.user.token);
      const id = parseInt(this.$router.currentRoute.params.id); // getting id from url
      const fetchedProfile = await getUserProfileById(id, this.token);
      this.$store.commit('profile/setProfile', fetchedProfile);
    },
    async onPostLike(id) {
      await addLikeToPost(id, this.token);
      const urlId = parseInt(this.$router.currentRoute.params.id); // getting id from url
      const fetchedProfile = await getUserProfileById(urlId, this.user.token);
      this.$store.commit('profile/setProfile', fetchedProfile);
    },
    async onUserFollow(id) {
      await followPerson(id, this.token);
      const urlId = parseInt(this.$router.currentRoute.params.id); // getting id from url
      const fetchedProfile = await getUserProfileById(urlId, this.token);
      const fetchedUser = await getUserData(this.token);
      this.$store.commit('profile/setProfile', fetchedProfile);
      this.$store.commit('auth/setUser', fetchedUser);
      this.$store.commit('auth/setToken', fetchedUser.token);
    },
  },
};
</script>

<style scoped></style>
