<template>
  <div
    v-if="user"
    class="flex min-h-screen w-full flex-col items-center justify-start space-y-6 pt-4 pb-16 dark:bg-slate-800 md:py-6"
  >
    <story-list v-if="stories.length" :stories="stories" />
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
import ProfilePicture from '../../components/persons/ProfilePicture.vue';
import PostList from '../../components/posts/PostList.vue';
import StoryList from '../../components/posts/stories/StoryList.vue';
import { MESSAGES } from '../../util/constants';

export default {
  name: 'FeedPage',
  middleware: 'authenticated',
  data() {
    return {
      showCard: false,
    };
  },
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
    stories() {
      return this.$store.getters['feed/stories'];
    },
  },
  async fetch() {
    await this.$store.dispatch('feed/posts', this.token);
    await this.$store.dispatch('feed/stories', this.token);
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
  components: {
    PostList,
    ProfilePicture,
    ProfilePicture,
    StoryList,
  },
};
</script>

<style scoped></style>
