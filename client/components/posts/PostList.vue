<template>
  <div class="my-4 flex flex-col items-center space-y-2">
    <post-list-item
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :uuid="post.uuid"
      :ownerName="post.creator.name"
      :ownerId="post.creator.id"
      :ownerUUID="post.creator.uuid"
      :content="post.content"
      :numberOfLikes="post.post_stats.like_count"
      :time="time(post.updated_at, post.created_at)"
      @onPostLike="onPostLike"
    ></post-list-item>
  </div>
</template>

<script>
import PostListItem from './PostListItem.vue';
import { getTime } from '../../util/helpers';

export default {
  name: 'PostList',
  components: { PostListItem },
  props: ['posts'],
  methods: {
    onPostLike(uuid) {
      this.$emit('onPostLike', uuid);
    },
    time(updated_at, created_at) {
      return getTime(updated_at ? updated_at : created_at);
    },
  },
};
</script>

<style scoped></style>
