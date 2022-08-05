<template>
  <div>
    <profile-header
      v-if="user"
      :uuid="user.uuid"
      :id="user.id"
      :name="user.name"
      :numberOfPosts="user.posts.length"
      :numberOfFollowings="user.followers.length"
      :numberOfFollowers="user.followings.length"
    />
    <div class="m-4 flex justify-center">
      <NuxtLink
        to="/people"
        class="block w-full cursor-pointer rounded bg-yellow-500 p-2 text-center text-2xl font-bold text-yellow-50 md:w-2/3 md:text-xl"
        >Explore</NuxtLink
      >
    </div>
    <post-list v-if="posts" :posts="posts" @onPostLike="onPostLike" />
  </div>
</template>

<script>
import PostList from '../../components/posts/PostList.vue';
import { addLikeToPost, getUserFeed } from '../../helpers';
import ProfileHeader from '../../components/persons/ProfileHeader.vue';
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
  components: { PostList, ProfileHeader },
};
</script>

<style scoped></style>
