<template>
  <div>
    Feed Page
    <div v-if="posts">
      <!-- <PostList :posts="posts" :name="'Some user'" /> -->
      <div v-for="post in posts" :key="post.id">{{ post.content }}</div>
    </div>
  </div>
</template>

<script>
import { getUserFeed } from '../helpers';
export default {
  name: 'FeedPage',
  computed: {
    profile() {
      return this.$store.getters['profile/getProfile']();
    },
    user() {
      return this.$store.getters['auth/getUser']();
    },
    posts() {
      return this.$store.getters['feed/getPosts']();
    },
  },
  created() {
    if (!this.user) {
      this.$router.push('/');
    }
  },
  async fetch() {
    const fetchedPosts = await getUserFeed(this.user.token);
    this.$store.commit('feed/setPosts', fetchedPosts);
  },
};
</script>

<style scoped></style>
