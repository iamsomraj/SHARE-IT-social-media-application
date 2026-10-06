<template>
  <div>
    <Toast />
    <Header />
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { LOCAL_STORAGE_KEYS } from '~/utils/constants'

  const router = useRouter()
  const route = useRoute()
  const themeStore = useThemeStore()

  // Logging out in another tab removes the token; send this tab to login.
  const onStorageChange = (event: StorageEvent) => {
    if (
      event.key === LOCAL_STORAGE_KEYS.TOKEN &&
      !event.newValue &&
      route.path !== '/' &&
      route.path !== '/register'
    ) {
      useAuthStore().clear()
      router.push('/')
    }
  }

  onMounted(() => {
    themeStore.initializeTheme()
    window.addEventListener('storage', onStorageChange)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('storage', onStorageChange)
  })
</script>
