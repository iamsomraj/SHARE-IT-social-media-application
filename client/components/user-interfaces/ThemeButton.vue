<template>
  <div>
    <moon-icon
      class="h-6 w-6 cursor-pointer fill-slate-300 transition-all duration-500 hover:fill-blue-400 active:fill-blue-400"
      :class="{ hidden: !isDarkMode }"
      @click="changeTheme('light')"
    ></moon-icon>
    <sun-icon
      class="h-6 w-6 cursor-pointer stroke-slate-300 transition-all duration-500 hover:stroke-blue-400 active:stroke-blue-400"
      :class="{ hidden: isDarkMode }"
      @click="changeTheme('dark')"
    ></sun-icon>
  </div>
</template>

<script>
import MoonIcon from '../assets/MoonIcon.vue';
import SunIcon from '../assets/SunIcon.vue';
export default {
  name: 'ThemeButton',
  data() {
    return {
      isDarkMode: true,
    };
  },
  components: { MoonIcon, SunIcon },
};
</script>
