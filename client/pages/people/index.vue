<template>
  <div>
    <ProfileHeader
      v-if="user"
      :id="user.id"
      :name="user.name"
      :numberOfPosts="user.posts.length"
      :numberOfFollowers="user.followers.length"
      :numberOfFollowings="user.followings.length"
    />
    <ExploreMain :people="people" />
  </div>
</template>

<script>
import { getPeople } from '../../helpers';
export default {
  name: 'FeedPage',
  data() {
    return {
      people: [],
    };
  },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
    token() {
      return this.$store.getters['auth/token'];
    },
  },
  async fetch() {
    const data = await getPeople(this.token);
    this.people = data.people;
  },
};
</script>

<style scoped></style>
