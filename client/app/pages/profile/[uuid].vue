<template>
  <div class="min-h-screen w-full pb-16 pt-4 dark:bg-slate-800 md:py-8">
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
