<template>
  <div class="flex flex-col items-start justify-center space-y-2">
    <div
      class="text-left text-lg font-bold capitalize text-slate-600 dark:text-slate-200"
    >
      {{ name }}
    </div>
    <div class="text-left text-xs font-light text-slate-400">
      {{ email }}
    </div>
  </div>
</template>

<script setup lang="ts">
  interface ProfileDetailProps {
    name: string
    email: string
  }

  defineProps<ProfileDetailProps>()
</script>
