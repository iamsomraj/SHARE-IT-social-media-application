<template>
  <div
    v-if="user"
    class="flex w-full flex-col items-center justify-center space-y-6 pt-4 pb-16 dark:bg-slate-800 md:py-6"
  >
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
import PostList from '../../components/posts/PostList.vue';
import { MESSAGES } from '../../util/constants';

export default {
  name: 'FeedPage',
  middleware: 'authenticated',
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
    token() {
      return this.$store.getters['auth/token'];
    },
    posts() {
      return this.$store.getters['feed/posts'];
    },
  },
  async fetch() {
    await this.$store.dispatch('feed/posts', this.token);
  },
  methods: {
    async onPostLike(uuid) {
      this.loading = true;
      const payload = {
        postUUID: uuid,
        token: this.token,
      };
      const res = await this.$store.dispatch('feed/likePost', payload);
      this.loading = false;
      if (res.state) {
        this.$store.dispatch('toast/success', MESSAGES.POST_LIKE_SUCCESS);
      } else {
        this.$store.dispatch('toast/error', MESSAGES.POST_LIKE_FAILURE);
      }
    },
    async onPostUnlike(uuid) {
      this.loading = true;
      const payload = {
        postUUID: uuid,
        token: this.token,
      };
      const res = await this.$store.dispatch('feed/unlikePost', payload);
      this.loading = false;
      if (res.state) {
        this.$store.dispatch('toast/success', MESSAGES.POST_UNLIKE_SUCCESS);
      } else {
        this.$store.dispatch('toast/error', MESSAGES.POST_UNLIKE_FAILURE);
      }
    },
  },
  components: { PostList },
};
</script>

<style scoped></style>
