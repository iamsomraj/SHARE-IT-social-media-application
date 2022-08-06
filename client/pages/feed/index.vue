<template>
  <div
    v-if="user"
    class="flex w-full flex-col items-center justify-center space-y-6"
  >
    <profile-header
      v-if="user"
      :uuid="user.uuid"
      :id="user.id"
      :name="user.name"
      :email="user.email"
      :numberOfPosts="user.person_stats.post_count"
      :numberOfFollowings="user.person_stats.following_count"
      :numberOfFollowers="user.person_stats.follower_count"
    />
    <post-list
      class="w-full"
      v-if="posts"
      :posts="posts"
      @onPostLike="onPostLike"
      @onPostUnlike="onPostUnlike"
    />
  </div>
</template>

<script>
import ProfileHeader from '../../components/persons/ProfileHeader.vue';
import PostList from '../../components/posts/PostList.vue';
export default {
  name: 'FeedPage',
  middleware: 'authenticated',
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
    posts() {
      return this.$store.getters['auth/feed_posts'];
    },
  },
  async fetch() {
    await this.$store.dispatch('auth/feed');
  },
  methods: {
    async onPostLike(uuid) {
      this.loading = true;
      const res = await this.$store.dispatch('auth/likePost', uuid);
      this.loading = false;
      if (res.state) {
        this.$store.dispatch('toast/success', MESSAGES.POST_LIKE_SUCCESS);
      } else {
        this.$store.dispatch('toast/error', MESSAGES.POST_LIKE_FAILURE);
      }
    },
    async onPostUnlike(uuid) {
      this.loading = true;
      const res = await this.$store.dispatch('auth/unlikePost', uuid);
      this.loading = false;
      if (res.state) {
        this.$store.dispatch('toast/success', MESSAGES.POST_UNLIKE_SUCCESS);
      } else {
        this.$store.dispatch('toast/error', MESSAGES.POST_UNLIKE_FAILURE);
      }
    },
  },
  components: { PostList, ProfileHeader },
};
</script>

<style scoped></style>
