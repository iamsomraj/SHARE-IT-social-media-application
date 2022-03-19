<template>
  <div>
    <div v-if="profile">
      <ProfileHeader
        :name="profile.name"
        :numberOfPosts="profile.posts.length"
        :numberOfFollowers="profile.followers.length"
        :numberOfFollowings="profile.followings.length"
      />
      <ProfileBody
        :posts="profile.posts"
        :name="profile.name"
        @onPostCreate="onPostCreate"
      />
    </div>
  </div>
</template>

<script>
import { getUserProfileById } from '../../helpers';
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
    onPostCreate(postInput) {
      alert(postInput);
    },
  },
};
</script>

<style scoped></style>
