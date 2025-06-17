<template>
  <div @click="toggleTheme">
    <MoonIcon
      class="h-6 w-6 cursor-pointer fill-slate-300 transition-all duration-300 hover:fill-blue-400 active:fill-blue-400 dark:fill-slate-600 dark:hover:fill-blue-400 dark:active:fill-blue-400"
      :class="{ hidden: !isDarkMode }"
    />
    <SunIcon
      class="h-6 w-6 cursor-pointer stroke-slate-300 transition-all duration-300 hover:stroke-blue-400 active:stroke-blue-400 dark:hover:stroke-blue-400 dark:active:stroke-blue-400"
      :class="{ hidden: isDarkMode }"
    />
  </div>
</template>

<script setup lang="ts">
  import { useThemeStore } from '~/stores/theme'
  import MoonIcon from '~/components/assets/MoonIcon.vue'
  import SunIcon from '~/components/assets/SunIcon.vue'

  // Store
  const themeStore = useThemeStore()

  // Computed properties
  const isDarkMode = computed(() => themeStore.isDarkTheme)

  // Methods
  const toggleTheme = () => {
    themeStore.toggleTheme()
  }

  // Initialize theme on component mount
  onMounted(() => {
    themeStore.initializeTheme()
  })
</script>
