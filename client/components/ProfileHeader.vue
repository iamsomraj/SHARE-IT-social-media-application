<template>
  <div class="flex justify-evenly items-center text-sm space-x-2">
    <div class="text-xl text-gray-500 font-extrabold">{{ profile.name }}</div>
    <div class="px-1 py-2 text-center">
      <div>{{ profile.posts.length }}</div>
      <div>Posts</div>
    </div>
    <div class="px-1 py-2 text-center">
      <div>{{ profile.followers.length }}</div>
      <div>Followers</div>
    </div>
    <div class="px-1 py-2 text-center">
      <div>{{ profile.followings.length }}</div>
      <div>Followings</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileHeader',
  props: ['profile'],
};
</script>

<style scoped></style>
