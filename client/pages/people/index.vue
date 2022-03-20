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
    {{ people }}
  </div>
</template>

<script>
import { getUserFeed, addLikeToPost, getPeople } from '../../helpers';
export default {
  name: 'FeedPage',
  computed: {
    user() {
      return this.$store.getters['auth/getUser']();
    },
  },
  async asyncData(context) {
    const token = context.store.getters['auth/getUser']().token;
    const data = await getPeople(token);
    return {
      people: data.people,
    };
  },
  methods: {},
};
</script>

<style scoped></style>
