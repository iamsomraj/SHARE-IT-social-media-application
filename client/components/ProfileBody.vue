<template>
  <div class="my-2">
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
import { addLikeToPost } from '../helpers/index.js';
export default {
  name: 'ProfileBody',
  props: ['posts', 'name'],
  methods: {
    async onLikeHandler(id) {
      const user = this.$store.getters['auth/getUser']();
      const profile = await addLikeToPost(id, user.token);
      this.$store.commit('profile/setProfile', profile);
    },
  },
};
</script>

<style lang="scss" scoped></style>
