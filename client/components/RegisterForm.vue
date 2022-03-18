<template>
  <div>
    <form class="space-y-4" @submit="onRegister">
      <div>
        <input
          class="px-4 py-3 outline-none border-2 border-gray-200 rounded"
          placeholder="Name"
          v-model="name"
        />
      </div>
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
        <button class="bg-red-400 w-full p-2 font-bold rounded">
          Register
        </button>
        <NuxtLink
          to="/"
          class="bg-blue-400 w-full p-2 font-bold rounded text-center"
        >
          Login
        </NuxtLink>
      </div>
    </form>
    <Footer />
  </div>
</template>

<script>
import { userRegister } from '../helpers';
export default {
  name: 'RegisterForm',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async onRegister(e) {
      e.preventDefault();
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      const registeredUser = await userRegister(formData);
      this.$store.commit('auth/setUser', registeredUser);
      /**
       * navigating to profile page
       */
      this.$router.push(`profile/${registeredUser.id}`);
    },
  },
};
</script>

<style scoped></style>
