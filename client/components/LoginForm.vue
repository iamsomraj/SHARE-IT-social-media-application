<template>
  <div>
    <form class="space-y-4" @submit="onSubmit">
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
        <NuxtLink
          to="/register"
          class="bg-blue-400 w-full p-2 font-bold rounded text-center"
        >
          Register
        </NuxtLink>
      </div>
    </form>
    <Footer />  
  </div>
</template>

<script>
import { userLogin } from '../api/';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    getUser() {
      return this.$store.getters['auth/getUser']();
    },
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      const formData = {
        email: this.email,
        password: this.password,
      };
      const loggedInUser = await userLogin(formData);
      this.$store.commit('auth/setUser', loggedInUser);
    },
  },
};
</script>

<style scoped></style>
