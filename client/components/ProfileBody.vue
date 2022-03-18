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
      <div class="text-xs flex justify-between items-center">
        <button class="text-gray-400 font-extrabold">Like</button>
        <div>
          {{ (post.updatedAt ? post.updatedAt : post.createdAt).slice(0, 10) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileBody',
  props: ['profile'],
};
</script>

<style lang="scss" scoped></style>
