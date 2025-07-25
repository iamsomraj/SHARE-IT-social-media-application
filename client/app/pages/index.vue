<template>
  <div
    class="relative flex max-h-screen min-h-screen w-full items-center justify-center dark:bg-slate-800"
  >
    <theme-button
      class="absolute right-4 top-4 rounded-xl border-2 p-2 dark:border-slate-600"
    />
    <login-form />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'guest',
  })

  const router = useRouter()
  const authStore = useAuthStore()

  const isLoggedIn = computed(() => authStore.isLoggedIn)

  onMounted(async () => {
    await authStore.checkAuth()
    if (isLoggedIn.value) {
      await router.push('/feed')
    }
  })

  if (isLoggedIn.value) {
    await navigateTo('/feed')
  }
</script>
