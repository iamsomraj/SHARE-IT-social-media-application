<template>
  <div>
    <form class="space-y-4">
      <div>
        <input
          class="px-4 py-3 outline-none border-2 border-gray-200 rounded"
          placeholder="Email"
          type="email"
          v-model="email"
        />
      </div>
      <div>
        <input
          class="px-4 py-3 outline-none border-2 border-gray-200 rounded"
          placeholder="Password"
          type="password"
          v-model="password"
        />
      </div>
      <div class="flex justify-evenly items-center text-white space-x-4">
        <button class="bg-red-400 w-full p-2 font-bold rounded">Login</button>
        <button class="bg-blue-400 w-full p-2 font-bold rounded">
          Register
        </button>
      </div>
    </form>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
    }
  },
}
</script>

<style scoped></style>
