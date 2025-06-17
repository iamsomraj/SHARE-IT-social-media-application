<template>
  <div class="flex w-full items-center justify-center py-4">
    <div class="mx-6 flex w-full justify-center space-x-2 md:mx-0 md:w-1/2">
      <PostInput
        placeholder="Speak your mind"
        :loading="loading"
        v-model="postInput"
        @onEnter="onPostCreate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { MESSAGES } from '~/utils/constants'
  import { usePostStore } from '~/stores/post'
  import { useToastStore } from '~/stores/toast'
  import { useAuthStore } from '~/stores/auth'

  const postStore = usePostStore()
  const toastStore = useToastStore()
  const authStore = useAuthStore()

  const postInput = ref('')
  const loading = ref(false)

  const onPostCreate = async () => {
    loading.value = true
    const content = postInput.value

    try {
      const res = await postStore.createPost({
        content,
        token: authStore.token!,
      })
      loading.value = false

      if (res.success) {
        postInput.value = ''
        toastStore.success(MESSAGES.POST_CREATE_SUCCESS)
      } else {
        toastStore.error(MESSAGES.POST_CREATE_FAILURE)
      }
    } catch {
      loading.value = false
      toastStore.error(MESSAGES.POST_CREATE_FAILURE)
    }
  }
</script>

<style scoped></style>
