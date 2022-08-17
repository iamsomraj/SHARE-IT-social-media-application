<template>
  <div @click="toggleTheme">
    <moon-icon
      class="h-6 w-6 cursor-pointer fill-slate-300 transition-all duration-300 hover:fill-blue-400 active:fill-blue-400 dark:fill-slate-600 dark:hover:fill-blue-400 dark:active:fill-blue-400"
      :class="{ hidden: !isDarkMode }"
    ></moon-icon>
    <sun-icon
      class="h-6 w-6 cursor-pointer stroke-slate-300 transition-all duration-300 hover:stroke-blue-400 active:stroke-blue-400 dark:hover:stroke-blue-400 dark:active:stroke-blue-400"
      :class="{ hidden: isDarkMode }"
    ></sun-icon>
  </div>
</template>

<script>
import MoonIcon from '../assets/MoonIcon.vue';
import SunIcon from '../assets/SunIcon.vue';
export default {
  name: 'ThemeButton',
  computed: {
    theme() {
      return this.$store.getters['theme/theme'];
    },
    isDarkMode() {
      return this.$store.getters['theme/isDarkTheme'];
    },
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch('theme/toggleTheme');
    },
  },
  components: { MoonIcon, SunIcon },
};
</script>
