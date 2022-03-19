<template>
  <div class="my-2">
    <PostList :posts="posts" :name="name" />
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
