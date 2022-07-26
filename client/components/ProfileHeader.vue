<template>
  <div class="flex justify-evenly items-center text-sm space-x-2">
    <div
      class="text-xl text-gray-500 font-extrabold cursor-pointer"
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
