<template>
  <div>
    <ProfileHeader
      v-if="user"
      :id="user.id"
      :name="user.name"
      :numberOfPosts="user.posts.length"
      :numberOfFollowings="user.followers.length"
      :numberOfFollowers="user.followings.length"
    />
    <div class="flex justify-center m-4">
      <NuxtLink
        to="/people"
        class="block w-full md:w-2/3 bg-yellow-500 p-2 text-center cursor-pointer text-2xl md:text-xl text-yellow-50 font-bold rounded"
        >Explore</NuxtLink
      >
    </div>
    <PostList v-if="posts" :posts="posts" @onPostLike="onPostLike" />
  </div>
</template>

<script>
import { getUserFeed, addLikeToPost } from '../../helpers';
export default {
  name: 'FeedPage',
  middleware: 'authenticated',
  data() {
    return {
      posts: [],
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
    const data = await getUserFeed(this.token);
    this.posts = data.posts;
  },
  methods: {
    async onPostLike(uuid) {
      await addLikeToPost(uuid, this.token);
      const data = await getUserFeed(this.token);
      this.posts = data.posts;
    },
  },
};
</script>

<style scoped></style>
