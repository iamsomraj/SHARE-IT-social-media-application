<template>
  <div
    class="my-2 flex flex-col items-center space-y-2 px-0 md:px-12"
  >
    <post-list-item
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
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
    ></post-list-item>
  </div>
</template>

<script>
import { getTime } from '../../util/helpers';
import PostListItem from './PostListItem.vue';

export default {
  name: 'PostList',
  components: { PostListItem },
  props: ['posts'],
  methods: {
    time(updated_at, created_at) {
      return getTime(updated_at ? updated_at : created_at);
    },
    onPostLike(uuid) {
      this.$emit('onPostLike', uuid);
    },
    onPostUnlike(uuid) {
      this.$emit('onPostUnlike', uuid);
    },
  },
};
</script>

<style scoped></style>
