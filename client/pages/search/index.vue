<template>
  <div
    class="flex min-h-screen w-screen items-start justify-center pb-16 pt-4 dark:bg-slate-800 md:py-6"
  >
    <search-people />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: 'authenticated',
  })
</script>
