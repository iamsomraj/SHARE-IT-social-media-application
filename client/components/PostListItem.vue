<template>
  <div class="space-y-4">
    <div
      class="inline rounded-lg bg-gray-400 px-2 py-1 text-xs text-white font-extrabold"
    >
      {{ name }}
    </div>
    <div>
      {{ content }}
    </div>
    <div class="text-xs flex justify-evenly items-center space-x-2">
      <div class="flex justify-center items-center space-x-1">
        <div>{{ numberOfLikes }}</div>
        <Heart />
      </div>
      <div>
        {{ date }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostListItem',
  props: ['name', 'content', 'numberOfLikes', 'date'],
};
</script>

<style lang="scss" scoped></style>
