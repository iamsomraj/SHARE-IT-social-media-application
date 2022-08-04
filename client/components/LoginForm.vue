<template>
  <!-- BEGIN: LOGIN FORM COMPONENT -->
  <div
    class="mx-4 flex h-full w-full flex-col items-center justify-center space-y-4 p-4 md:w-1/2 md:flex-row md:space-x-4 md:divide-x"
  >
    <div
      class="flex w-full flex-col items-center justify-center space-y-2 text-center text-4xl font-extrabold tracking-tighter md:flex md:flex-row md:space-y-0 md:space-x-2"
    >
      <div class="text-blue-400">SHARE</div>
      <div class="text-yellow-400">IT</div>
    </div>
    <!-- BEGIN: LOGIN FORM -->
    <form
      class="flex w-full flex-col items-center justify-center space-y-4 p-4"
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
      <div
        class="flex w-full flex-col items-center justify-center space-y-2 text-white"
      >
        <secondary-button @onClick="onSubmit" type="submit" class="flex-grow">
          <template #default>Login</template>
        </secondary-button>
        <primary-button @onClick="$router.push('/register')" class="flex-grow">
          <template #default>Register</template>
        </primary-button>
      </div>
      <!-- END: LOGIN FORM SUBMIT -->
    </form>
    <!-- END: LOGIN FORM -->
  </div>
  <!-- END: LOGIN FORM COMPONENT -->
</template>

<script>
import { MESSAGES } from '../util/index.js';
import SecondaryButton from './UI/SecondaryButton.vue';
import PrimaryButton from './UI/PrimaryButton.vue';
export default {
  name: 'LoginForm',
  components: {
    SecondaryButton,
    PrimaryButton,
  },
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
        this.$store.dispatch('toast/success', MESSAGES.LOGIN_SUCCESS);
      } else {
        this.$store.dispatch('toast/error', res.message);
      }
    },
  },
};
</script>

<style scoped></style>
