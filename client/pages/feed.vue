<template>
  <div>
    <PostList :posts="posts" @onPostLike="console.log('Hi')" />
  </div>
</template>

<script>
import { getUserFeed } from '../helpers';
export default {
  name: 'FeedPage',
  async asyncData(context) {
    const token = context.store.getters['auth/getUser']().token;
    const data = await getUserFeed(token);
    return {
      posts: data.posts,
    };
  },
};
</script>

<style scoped></style>
