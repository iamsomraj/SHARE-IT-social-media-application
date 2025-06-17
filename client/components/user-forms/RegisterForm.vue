<template>
  <!-- BEGIN: REGISTER FORM COMPONENT -->
  <div
    class="mx-4 flex h-full w-full flex-col items-center justify-center space-y-4 p-4 md:w-1/2 md:flex-row md:space-x-4 md:divide-x md:dark:divide-slate-600"
  >
    <!-- BEGIN: FORM LOGO -->
    <form-logo />
    <!-- END: FORM LOGO -->

    <!-- BEGIN: REGISTER FORM -->
    <form
      class="flex w-full flex-col items-center justify-center space-y-4 p-4"
      @submit.prevent="onSubmit"
    >
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
    </form>
    <!-- END: REGISTER FORM -->
  </div>
  <!-- END: REGISTER FORM COMPONENT -->
</template>

<script setup lang="ts">
  import { MESSAGES } from '~/utils/constants'

  const router = useRouter()
  const authStore = useAuthStore()
  const toastStore = useToastStore()

  const name = ref('')
  const email = ref('')
  const password = ref('')
  const loading = ref(false)

  const user = computed(() => authStore.user)

  const disabled = computed(() => {
    return !name.value || !email.value || !password.value
  })

  const onSubmit = async () => {
    const registerFormData = {
      name: name.value,
      email: email.value,
      password: password.value,
    }

    loading.value = true

    try {
      const res = await authStore.register(registerFormData)
      loading.value = false

      if (res.success) {
        await router.push(`/profile/${user.value.uuid}`)
        toastStore.success(MESSAGES.REGISTER_SUCCESS)
      } else {
        toastStore.error(res.error || 'Registration failed')
      }
    } catch {
      loading.value = false
      toastStore.error('Registration failed')
    }
  }
</script>
