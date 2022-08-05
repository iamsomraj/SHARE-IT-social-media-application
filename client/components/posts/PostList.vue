<template>
  <div class="m-4 flex flex-col items-center space-y-2">
    <div
      v-for="post in posts"
      :key="post.id"
      class="w-full rounded border px-6 py-3 md:w-2/3"
    >
      <post-list-item
        :id="post.id"
        :uuid="post.uuid"
        :ownerName="post.creator.name"
        :ownerId="post.creator.id"
        :ownerUUID="post.creator.uuid"
        :content="post.content"
        :numberOfLikes="post.post_stats.like_count"
        :date="
          (post.updated_at ? post.updated_at : post.created_at).slice(0, 10)
        "
        @onPostLike="onPostLike"
      ></post-list-item>
    </div>
  </div>
</template>

<script>
import PostListItem from './PostListItem';

export default {
  name: 'PostList',
  components: { PostListItem },
  props: ['posts'],
  methods: {
    onPostLike(uuid) {
      this.$emit('onPostLike', uuid);
    },
  },
};
</script>

<style scoped></style>
