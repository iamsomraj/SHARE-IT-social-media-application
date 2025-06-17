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
  import type { PostOperationResult } from '~/types/auth'

  // Store instances
  const postStore = usePostStore()
  const toastStore = useToastStore()
  const authStore = useAuthStore()

  // Component state
  const postInput = ref<string>('')
  const loading = ref<boolean>(false)

  // Create post handler with proper error handling
  const onPostCreate = async (): Promise<void> => {
    if (!postInput.value.trim()) {
      toastStore.warning('Please enter some content for your post')
      return
    }

    if (!authStore.token) {
      toastStore.error('You must be logged in to create a post')
      return
    }

    loading.value = true
    const content = postInput.value.trim()

    try {
      const result: PostOperationResult = await postStore.createPost({
        content,
        token: authStore.token,
      })

      if (result.success) {
        postInput.value = ''
        toastStore.success(MESSAGES.POST_CREATE_SUCCESS)
      } else {
        toastStore.error(result.error || MESSAGES.POST_CREATE_FAILURE)
      }
    } catch {
      toastStore.error(MESSAGES.POST_CREATE_FAILURE)
    } finally {
      loading.value = false
    }
  }
</script>

<style scoped></style>
