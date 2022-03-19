<template>
  <div>
    <div
      v-for="post in posts"
      :key="post.id"
      class="px-6 py-3 border-t border-b border-separate"
    >
      <PostListItem
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
};
</script>

<style scoped></style>
