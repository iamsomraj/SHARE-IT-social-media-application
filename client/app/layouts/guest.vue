<template>
  <div>
    <Toast />
    <slot />
  </div>
</template>

<script setup lang="ts">
  const themeStore = useThemeStore()

  onMounted(() => {
    themeStore.initializeTheme()
  })
</script>

<style scoped></style>
