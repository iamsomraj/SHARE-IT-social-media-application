<template>
  <div class="space-y-4">
    <div
      class="inline rounded-lg bg-gray-400 px-2 py-1 cursor-pointer text-xs text-white font-extrabold"
      @click="$router.push(`/profile/${ownerId}`)"
    >
      @{{ ownerName }}
    </div>
    <div>
      {{ content }}
    </div>
    <div class="text-xs flex justify-evenly items-center space-x-2">
      <div
        class="flex justify-center items-center space-x-1 cursor-pointer"
        @click="onPostLike(uuid)"
      >
        <div>{{ numberOfLikes }}</div>
        <Heart :red="numberOfLikes === 0 ? 'none' : 'red'" />
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
  props: ['uuid', 'ownerName', 'ownerId', 'content', 'numberOfLikes', 'date'],
  methods: {
    onPostLike(uuid) {
      this.$emit('onPostLike', uuid);
    },
  },
};
</script>

<style lang="scss" scoped></style>
