<template>
  <div
    class="flex min-h-screen w-screen items-start justify-center pt-4 pb-16 md:py-6 dark:bg-slate-800"
  >
    <search-people />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: 'authenticated',
  })
</script>
