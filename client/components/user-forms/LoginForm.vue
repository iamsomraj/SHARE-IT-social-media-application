<template>
  <!-- BEGIN: LOGIN FORM COMPONENT -->
  <div
    class="mx-4 flex h-full w-full flex-col items-center justify-center space-y-4 p-4 md:w-1/2 md:flex-row md:space-x-4 md:divide-x md:dark:divide-slate-600"
  >
    <!-- BEGIN: FORM LOGO -->
    <form-logo />
    <!-- END: FORM LOGO -->

    <!-- BEGIN: LOGIN FORM -->
    <form
      class="flex w-full flex-col items-center justify-center space-y-4 p-4"
      @submit.prevent="onSubmit"
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
      <div class="w-full space-y-2">
        <primary-button
          @onClick="onSubmit"
          type="submit"
          class="flex-grow"
          :loading="loading"
          :disabled="disabled"
        >
          <template #default>Login</template>
        </primary-button>
        <secondary-button
          @onClick="$router.push('/register')"
          class="flex-grow"
        >
          <template #default>Register</template>
        </secondary-button>
      </div>
      <!-- END: LOGIN FORM SUBMIT -->
    </form>
    <!-- END: LOGIN FORM -->
  </div>
  <!-- END: LOGIN FORM COMPONENT -->
</template>

<script>
import { MESSAGES } from '../../util/constants.js';
import FormLogo from '../assets/FormLogo.vue';
import PrimaryButton from './../user-interfaces/PrimaryButton.vue';
import SecondaryButton from './../user-interfaces/SecondaryButton.vue';
import TextInput from './../user-interfaces/TextInput.vue';

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
      loading: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
    disabled() {
      return !this.email || !this.password;
    },
  },
  methods: {
    async onSubmit() {
      const loginFormData = {
        email: this.email,
        password: this.password,
      };
      this.loading = true;
      const res = await this.$store.dispatch('auth/login', loginFormData);
      this.loading = false;
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
