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
        :ownerName="post.owner.name"
        :ownerId="post.owner.id"
        :ownerUUID="post.owner.uuid"
        :content="post.content"
        :numberOfLikes="post.likesOnPost.length"
        :date="(post.updatedAt ? post.updatedAt : post.createdAt).slice(0, 10)"
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
