<template>
  <div class="flex flex-col items-center m-4 space-y-2">
    <div
      v-for="post in posts"
      :key="post.id"
      class="px-6 py-3 border rounded w-full md:w-2/3"
    >
      <PostListItem
        :id="post.id"
        :uuid="post.uuid"
        :ownerName="post.creator.name"
        :ownerId="post.creator.id"
        :ownerUUID="post.creator.uuid"
        :content="post.content"
        :numberOfLikes="post.post_likes.length"
        :date="(post.updated_at ? post.updated_at : post.created_at).slice(0, 10)"
        @onPostLike="onPostLike"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostList',
  props: ['posts'],
  methods: {
    onPostLike(uuid) {
      this.$emit('onPostLike', uuid);
    },
  },
};
</script>

<style scoped></style>
