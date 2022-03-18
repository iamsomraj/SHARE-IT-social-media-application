<template>
  <header class="flex items-center justify-between py-4 px-5">
    <NuxtLink
      to="/"
      class="px-3 py-2 rounded font-extrabold tracking-tighter bg-blue-100 text-blue-400"
      >SHARE IT</NuxtLink
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
