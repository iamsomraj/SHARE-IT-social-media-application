<template>
  <div class="flex flex-grow items-center justify-evenly">
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
  name: '',
  props: ['numberOfPosts', 'numberOfFollowers', 'numberOfFollowings'],
};
</script>
