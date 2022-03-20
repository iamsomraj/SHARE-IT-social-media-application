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
  getUserProfileById,
} from '../../helpers';
export default {
  name: 'ProfileIdPage',
  computed: {
    profile() {
      return this.$store.getters['profile/getProfile']();
    },
    user() {
      return this.$store.getters['auth/getUser']();
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
    const fetchedProfile = await getUserProfileById(id, this.user.token);
    this.$store.commit('profile/setProfile', fetchedProfile);
  },
  methods: {
    async onPostCreate(postInput) {
      const newPost = await createPost(postInput, this.user.token);
      const id = parseInt(this.$router.currentRoute.params.id); // getting id from url
      const fetchedProfile = await getUserProfileById(id, this.user.token);
      this.$store.commit('profile/setProfile', fetchedProfile);
    },
    async onPostLike(id) {
      await addLikeToPost(id, this.user.token);
      const urlId = parseInt(this.$router.currentRoute.params.id); // getting id from url
      const fetchedProfile = await getUserProfileById(urlId, this.user.token);
      this.$store.commit('profile/setProfile', fetchedProfile);
    },
    async onUserFollow(id) {
      await followPerson(id, this.user.token);
      const urlId = parseInt(this.$router.currentRoute.params.id); // getting id from url
      const fetchedProfile = await getUserProfileById(urlId, this.user.token);
      this.$store.commit('profile/setProfile', fetchedProfile);
    },
  },
};
</script>

<style scoped></style>
