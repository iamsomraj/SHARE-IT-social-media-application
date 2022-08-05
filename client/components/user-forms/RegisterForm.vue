<template>
  <!-- BEGIN: REGISTER FORM COMPONENT -->
  <div
    class="mx-4 flex h-full w-full flex-col items-center justify-center space-y-4 p-4 md:w-1/2 md:flex-row md:space-x-4 md:divide-x"
  >
    <!-- BEGIN: FORM LOGO -->
    <form-logo />
    <!-- END: FORM LOGO -->

    <!-- BEGIN: REGISTER FORM -->
    <div class="flex w-full flex-col items-center justify-center space-y-4 p-4">
      <!-- BEGIN: REGISTER FORM NAME -->
      <div class="w-full">
        <text-input placeholder="Name" type="text" v-model="name" />
      </div>
      <!-- END: REGISTER FORM NAME -->

      <!-- BEGIN: REGISTER FORM EMAIL -->
      <div class="w-full">
        <text-input placeholder="Email" type="email" v-model="email" />
      </div>
      <!-- END: REGISTER FORM EMAIL -->

      <!-- BEGIN: REGISTER FORM PASSWORD -->
      <div class="w-full">
        <text-input placeholder="Password" type="password" v-model="password" />
      </div>
      <!-- END: REGISTER FORM PASSWORD -->

      <!-- BEGIN: REGISTER FORM SUBMIT -->
      <div class="w-full space-y-2">
        <primary-button
          @onClick="onSubmit"
          type="submit"
          class="flex-grow"
          :loading="loading"
          :disabled="disabled"
        >
          <template #default>Register</template>
        </primary-button>
        <secondary-button @onClick="$router.push('/')" class="flex-grow">
          <template #default>Login</template>
        </secondary-button>
      </div>
      <!-- END: REGISTER FORM SUBMIT -->
    </div>
    <!-- END: REGISTER FORM -->
  </div>
  <!-- END: REGISTER FORM COMPONENT -->
</template>

<script>
import { MESSAGES } from '../../util/constants.js';
import FormLogo from '../assets/FormLogo.vue';
import PrimaryButton from './../user-interface/PrimaryButton.vue';
import SecondaryButton from './../user-interface/SecondaryButton.vue';
import TextInput from './../user-interface/TextInput.vue';

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
      name: '',
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
      return !this.name || !this.email || !this.password;
    },
  },
  methods: {
    async onSubmit() {
      const registerFormData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      this.loading = true;
      const res = await this.$store.dispatch('auth/register', registerFormData);
      this.loading = false;
      if (res.state) {
        /* REDIRECTING TO THE PROFILE OF THE LOGGED IN USER */
        this.$router.push(`profile/${this.user.uuid}`);
        this.$store.dispatch('toast/success', MESSAGES.REGISTER_SUCCESS);
      } else {
        this.$store.dispatch('toast/error', res.message);
      }
    },
  },
};
</script>
