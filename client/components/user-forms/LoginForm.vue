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

<script setup lang="ts">
  import { MESSAGES } from '~/utils/constants'

  const router = useRouter()
  const authStore = useAuthStore()
  const toastStore = useToastStore()

  const email = ref('')
  const password = ref('')
  const loading = ref(false)

  const user = computed(() => authStore.user)

  const disabled = computed(() => {
    return !email.value || !password.value
  })

  const onSubmit = async () => {
    const loginFormData = {
      email: email.value,
      password: password.value,
    }

    loading.value = true

    try {
      const res = await authStore.login(loginFormData)
      loading.value = false

      if (res.success) {
        await router.push(`/profile/${user.value.uuid}`)
        toastStore.success(MESSAGES.LOGIN_SUCCESS)
      } else {
        toastStore.error(res.error || 'Login failed')
      }
    } catch {
      loading.value = false
      toastStore.error('Login failed')
    }
  }
</script>

<style scoped></style>
