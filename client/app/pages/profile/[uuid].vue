<template>
  <div class="min-h-screen w-full pt-4 pb-16 md:py-8 dark:bg-slate-800">
    <self-profile v-if="isLoggedInUserProfile" />
    <other-profile v-else />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: 'authenticated',
  })

  const route = useRoute()
  const authStore = useAuthStore()

  const isLoggedInUserProfile = computed(() => {
    return authStore.user?.uuid === route.params.uuid
  })
</script>
