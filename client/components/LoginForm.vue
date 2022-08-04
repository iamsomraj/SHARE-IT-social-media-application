<template>
  <!-- BEGIN: LOGIN FORM COMPONENT -->
  <div
    class="mx-4 flex h-full w-full flex-col items-center justify-center space-y-4 p-4 md:w-1/2 md:flex-row md:space-x-4 md:divide-x"
  >
    <!-- BEGIN: FORM LOGO -->
    <form-logo />
    <!-- END: FORM LOGO -->

    <!-- BEGIN: LOGIN FORM -->
    <form
      class="flex w-full flex-col items-center justify-center space-y-4 p-4"
    >
      <!-- BEGIN: LOGIN FORM EMAIL -->
      <div class="w-full">
        <text-input placeholder="Email" type="email" v-model="email" />
      </div>
      <!-- END: LOGIN FORM EMAIL -->

      <!-- BEGIN: LOGIN FORM PASSWORD -->
      <div class="w-full">
        <text-input placeholder="Password" type="password" v-model="password" />
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
import TextInput from './UI/TextInput.vue';
import FormLogo from './FormLogo.vue';
export default {
  name: 'LoginForm',
  components: {
    SecondaryButton,
    PrimaryButton,
    TextInput,
    FormLogo,
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
