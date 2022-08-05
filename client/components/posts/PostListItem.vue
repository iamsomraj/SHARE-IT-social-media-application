<template>
  <div class="space-y-4">
    <div
      class="inline cursor-pointer rounded-lg bg-gray-400 px-2 py-1 text-xs font-extrabold text-white"
      @click="$router.push(`/profile/${ownerUUID}`)"
    >
      @{{ ownerName }}
    </div>
    <div>
      {{ content }}
    </div>
    <div class="flex items-center justify-evenly space-x-2 text-xs">
      <div
        class="flex cursor-pointer items-center justify-center space-x-1"
        @click="onPostLike(uuid)"
      >
        <div>{{ numberOfLikes }}</div>
        <heart-icon class="text-gray-400"></heart-icon>
      </div>
      <div>
        {{ date }}
      </div>
    </div>
  </div>
</template>

<script>
import HeartIcon from './../assets/HeartIcon.vue';
export default {
  name: 'PostListItem',
  components: { HeartIcon },
  props: [
    'uuid',
    'ownerName',
    'ownerId',
    'ownerUUID',
    'content',
    'numberOfLikes',
    'date',
  ],
  methods: {
    onPostLike(uuid) {
      this.$emit('onPostLike', uuid);
    },
  },
};
</script>

<style lang="scss" scoped></style>
