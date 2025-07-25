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

  onMounted(() => {
    themeStore.initializeTheme()

    setInterval(() => {
      const tokenFromStorage = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)
      if (
        !tokenFromStorage &&
        route.path !== '/' &&
        route.path !== '/register'
      ) {
        router.push('/')
      }
    }, 1000)
  })
</script>
