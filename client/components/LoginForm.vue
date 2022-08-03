<template>
  <!-- BEGIN: LOGIN FORM COMPONENT -->
  <div class="h-full w-full sm:w-1/2 md:w-1/4">
    <!-- BEGIN: LOGIN FORM -->
    <form
      class="flex flex-col items-center justify-center space-y-4"
      @submit.prevent="onSubmit"
    >
      <!-- BEGIN: LOGIN FORM EMAIL -->
      <div class="w-full">
        <input
          class="outline-none w-full rounded border-2 border-gray-200 px-4 py-3"
          placeholder="Email"
          type="email"
          v-model="email"
        />
      </div>
      <!-- END: LOGIN FORM EMAIL -->

      <!-- BEGIN: LOGIN FORM PASSWORD -->
      <div class="w-full">
        <input
          class="outline-none w-full rounded border-2 border-gray-200 px-4 py-3"
          placeholder="Password"
          type="password"
          v-model="password"
        />
      </div>
      <!-- END: LOGIN FORM PASSWORD -->

      <!-- BEGIN: LOGIN FORM SUBMIT -->
      <div class="flex w-full items-center justify-center space-x-4 text-white">
        <button class="w-full flex-grow rounded bg-red-400 p-2 font-bold">
          Login
        </button>
        <NuxtLink
          to="/register"
          class="w-full flex-grow rounded bg-blue-400 p-2 text-center font-bold"
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
        this.$store.dispatch('toast/success', res.message);
      } else {
        this.$store.dispatch('toast/error', res.message);
      }
    },
  },
};
</script>

<style scoped></style>
