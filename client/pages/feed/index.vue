<template>
  <div
    v-if="user"
    class="flex min-h-screen w-full flex-col items-center justify-start space-y-6 pt-4 pb-16 dark:bg-slate-800 md:py-6"
  >
    <!-- BEGIN: FAVOURITE POST SECTIONS -->
    <div class="flex w-full justify-center md:px-12">
      <div
        class="flex w-full items-start justify-start space-x-2 overflow-x-auto border px-4 py-4 dark:border-slate-600 md:w-1/2 md:rounded-xl"
      >
        <div v-for="post in favouritePosts" :key="post.id">
          <profile-picture
            :uuid="post.creator.uuid"
            :name="post.creator.name"
            class="h-12 w-12 text-7xl"
          ></profile-picture>
        </div>
      </div>
    </div>
    <!-- END: FAVOURITE POST SECTIONS -->

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
import ProfilePicture from '../../components/persons/ProfilePicture.vue';

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
    favouritePosts() {
      return this.$store.getters['feed/favouritePosts'];
    },
  },
  async fetch() {
    await this.$store.dispatch('feed/posts', this.token);
    await this.$store.dispatch('feed/favouritePosts', this.token);
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
  components: { PostList, ProfilePicture },
};
</script>

<style scoped></style>
