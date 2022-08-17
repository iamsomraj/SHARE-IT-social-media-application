<template>
  <div class="col-span-8 flex items-center justify-between">
    <div class="px-1 py-2 text-center text-slate-600 dark:text-slate-200">
      <div>{{ numberOfPosts }}</div>
      <div class="text-xs text-slate-400">Posts</div>
    </div>
    <div class="px-1 py-2 text-center text-slate-600 dark:text-slate-200">
      <div>{{ numberOfFollowers }}</div>
      <div class="text-xs text-slate-400">Followers</div>
    </div>
    <div class="px-1 py-2 text-center text-slate-600 dark:text-slate-200">
      <div>{{ numberOfFollowings }}</div>
      <div class="text-xs text-slate-400">Followings</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['numberOfPosts', 'numberOfFollowers', 'numberOfFollowings'],
};
</script>
