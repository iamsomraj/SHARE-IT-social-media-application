<template>
  <header class="flex items-center justify-between py-4 px-5">
    <NuxtLink to="/" class="font-extrabold tracking-wider text-yellow-500"
      >Share Me</NuxtLink
    >
    <div class="flex items-center space-x-4 font-bold">
      <NuxtLink to="/register">Register</NuxtLink>
      <NuxtLink to="/" class="text-white bg-red-400 px-3 py-2 rounded"
        >Login</NuxtLink
      >
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss" scoped></style>
