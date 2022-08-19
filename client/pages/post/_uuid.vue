<template>
  <div
    class="min-h-screen w-full pt-4 pb-16 text-slate-600 dark:bg-slate-800 dark:text-slate-200 md:py-8"
  >
    Post Page
  </div>
</template>

<script>
export default {
  name: 'PostPage',
  middleware: 'authenticated',
};
</script>
