<template>
  <div class="my-2">
    <PostCreator @onPostCreate="onPostCreate" />
    <PostList :posts="posts" :name="name" @onPostLike="onPostLike" />
  </div>
</template>

<script>
import { addLikeToPost } from '../helpers/index.js';
export default {
  name: 'ProfileBody',
  props: ['posts', 'name'],
  methods: {
    onPostCreate(postInput) {
      this.$emit('onPostCreate', postInput);
    },
    onPostLike(id) {
      this.$emit('onPostLike', id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
