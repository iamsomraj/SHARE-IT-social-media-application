<template>
  <div class="my-2">
    <div
      v-for="post in profile.posts"
      :key="post.id"
      class="px-6 py-3 border-t border-b border-separate space-y-3"
    >
      <div
        class="inline rounded-lg bg-gray-400 px-2 py-1 text-xs text-white font-extrabold"
      >
        {{ profile.name }}
      </div>
      <div>
        {{ post.content }}
      </div>
      <div class="text-xs flex justify-evenly items-center space-x-3">
        <div v-if="post.likesOnPost.length > 0">
          {{ post.likesOnPost.length }} Likes
        </div>
        <button
          class="text-gray-400 font-extrabold"
          @click="onLikeHandler(post.id)"
        >
          Like
        </button>
        <div>
          {{ (post.updatedAt ? post.updatedAt : post.createdAt).slice(0, 10) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addLikeToPost } from '../helpers/index.js';
export default {
  name: 'ProfileBody',
  props: ['profile'],
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
