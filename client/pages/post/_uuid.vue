<template>
  <div
    class="flex min-h-screen w-full items-start justify-center pt-4 pb-16 text-slate-600 dark:bg-slate-800 dark:text-slate-200 md:py-8"
  >
    <post-card
      v-if="post"
      :key="post.uuid"
      :id="post.uuid"
      :uuid="post.uuid"
      :ownerName="post.creator.name"
      :ownerId="post.creator.id"
      :ownerUUID="post.creator.uuid"
      :postLikes="post.post_likes"
      :content="post.content"
      :numberOfLikes="post.post_stats.like_count"
      :time="time(post.updated_at, post.created_at)"
      @onPostLike="onPostLike"
      @onPostUnlike="onPostUnlike"
    ></post-card>
  </div>
</template>

<script>
import PostCard from '../../components/posts/PostCard.vue';
import { getTime } from '../../util/helpers';
export default {
  name: 'PostPage',
  middleware: 'authenticated',
  data() {
    return {
      loading: false,
    };
  },
  async fetch() {
    this.loading = true;
    const payload = { uuid: this.uuid, token: this.token };
    await this.$store.dispatch('post/fetchPost', payload);
    this.loading = false;
  },
  computed: {
    token() {
      return this.$store.getters['auth/token'];
    },
    uuid() {
      return this.$route.params.uuid;
    },
    post() {
      return this.$store.getters['post/post'];
    },
  },
  methods: {
    onPostLike(uuid) {
      this.$emit('onPostLike', uuid);
    },
    onPostUnlike(uuid) {
      this.$emit('onPostUnlike', uuid);
    },
    time(updated_at, created_at) {
      return getTime(updated_at ? updated_at : created_at);
    },
  },
  components: { PostCard },
};
</script>
