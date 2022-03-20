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
    <PostList v-if="posts" :posts="posts" @onPostLike="onPostLike" />
  </div>
</template>

<script>
import { getUserFeed, addLikeToPost } from '../../helpers';
export default {
  name: 'FeedPage',
  computed: {
    user() {
      return this.$store.getters['auth/getUser']();
    },
  },
  async asyncData(context) {
    const token = context.store.getters['auth/getUser']().token;
    const data = await getUserFeed(token);
    return {
      posts: data.posts,
    };
  },
  methods: {
    async onPostLike(id) {
      const token = this.$store.getters['auth/getUser']().token;
      await addLikeToPost(id, token);
      const data = await getUserFeed(token);
      this.posts = data.posts;
    },
  },
};
</script>

<style scoped></style>
