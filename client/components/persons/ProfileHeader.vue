<template>
  <div class="flex items-center justify-evenly space-x-2 text-sm">
    <div
      class="cursor-pointer text-xl font-extrabold text-gray-500"
      @click="$router.push(`/profile/${uuid}`)"
    >
      {{ name }}
    </div>
    <div class="px-1 py-2 text-center">
      <div>{{ numberOfPosts }}</div>
      <div>Posts</div>
    </div>
    <div class="px-1 py-2 text-center">
      <div>{{ numberOfFollowers }}</div>
      <div>Followers</div>
    </div>
    <div class="px-1 py-2 text-center">
      <div>{{ numberOfFollowings }}</div>
      <div>Followings</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileHeader',
  props: [
    'uuid',
    'id',
    'name',
    'numberOfPosts',
    'numberOfFollowers',
    'numberOfFollowings',
  ],
};
</script>

<style scoped></style>
