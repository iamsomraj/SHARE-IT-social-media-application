<template>
  <!-- BEGIN: LOGIN FORM COMPONENT -->
  <div class="w-full sm:w-1/2 md:w-1/4 h-full">

    <!-- BEGIN: LOGIN FORM -->
    <form
      class="flex flex-col justify-center items-center space-y-4"
      @submit.prevent="onSubmit"
    >

      <!-- BEGIN: LOGIN FORM MESSAGE -->
      <toast :message="message" :variant="'error'" />
      <!-- END: LOGIN FORM MESSAGE -->

      <!-- BEGIN: LOGIN FORM EMAIL -->
      <div class="w-full">
        <input
          class="w-full px-4 py-3 outline-none border-2 border-gray-200 rounded"
          placeholder="Email"
          type="email"
          v-model="email"
        />
      </div>
      <!-- END: LOGIN FORM EMAIL -->

      <!-- BEGIN: LOGIN FORM PASSWORD -->
      <div class="w-full">
        <input
          class="w-full px-4 py-3 outline-none border-2 border-gray-200 rounded"
          placeholder="Password"
          type="password"
          v-model="password"
        />
      </div>
      <!-- END: LOGIN FORM PASSWORD -->

      <!-- BEGIN: LOGIN FORM SUBMIT -->
      <div class="w-full flex justify-center items-center text-white space-x-4">
        <button class="flex-grow bg-red-400 w-full p-2 font-bold rounded">
          Login
        </button>
        <NuxtLink
          to="/register"
          class="flex-grow bg-blue-400 w-full p-2 font-bold rounded text-center"
        >
          Register
        </NuxtLink>
      </div>
      <!-- END: LOGIN FORM SUBMIT -->

    </form>
    <!-- END: LOGIN FORM -->

  </div>
  <!-- END: LOGIN FORM COMPONENT -->
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      message: '',
    };
  },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
  },
  methods: {
    async onSubmit() {
      const loginFormData = {
        email: this.email,
        password: this.password,
      };
      const res = await this.$store.dispatch('auth/login', loginFormData);
      if (res.state) {
        /* REDIRECTING TO THE PROFILE OF THE LOGGED IN USER */
        this.$router.push(`profile/${this.user.uuid}`);
      } else {
        this.message = res.message;
      }
    },
  },
};
</script>

<style scoped></style>
