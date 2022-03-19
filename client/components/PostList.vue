<template>
  <div>
    <div
      v-for="post in posts"
      :key="post.id"
      class="px-6 py-3 border-t border-b border-separate"
    >
      <PostListItem
        @onPostLike="onPostLike"
        :id="post.id"
        :name="name"
        :content="post.content"
        :numberOfLikes="post.likesOnPost.length"
        :date="(post.updatedAt ? post.updatedAt : post.createdAt).slice(0, 10)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostList',
  props: ['posts', 'name'],
  methods: {
    onPostLike(id) {
      this.$emit('onPostLike', id);
    },
  },
};
</script>

<style scoped></style>
