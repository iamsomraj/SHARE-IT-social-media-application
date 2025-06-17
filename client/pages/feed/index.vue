<template>
  <div
    v-if="user"
    class="flex min-h-screen w-full flex-col items-center justify-start space-y-6 pb-16 pt-4 dark:bg-slate-800 md:py-6"
  >
    <story-list v-if="stories.length" :stories="stories" />
    <post-list
      class="w-full"
      v-if="posts"
      :posts="posts"
      @onPostLike="onPostLike"
      @onPostUnlike="onPostUnlike"
    />
  </div>
</template>

<script setup lang="ts">
  import { MESSAGES } from '~/utils/constants'
  import { usePostStore } from '~/stores/post'

  definePageMeta({
    middleware: 'authenticated',
  })

  const authStore = useAuthStore()
  const feedStore = useFeedStore()
  const postStore = usePostStore()
  const toastStore = useToastStore()

  const user = computed(() => authStore.user)
  const token = computed(() => authStore.token)
  const posts = computed(() => feedStore.posts)
  const stories = computed(() => feedStore.stories)

  await feedStore.fetchPosts(token.value || '')
  await feedStore.fetchStories(token.value || '')

  const onPostLike = async (uuid: string) => {
    if (!token.value) return

    const payload = {
      postUUID: uuid,
      token: token.value,
    }

    const res = await postStore.likePost(payload)

    if (res.success) {
      toastStore.success(MESSAGES.POST_LIKE_SUCCESS)
    } else {
      toastStore.error(MESSAGES.POST_LIKE_FAILURE)
    }
  }

  const onPostUnlike = async (uuid: string) => {
    if (!token.value) return

    const payload = {
      postUUID: uuid,
      token: token.value,
    }

    const res = await postStore.unlikePost(payload)

    if (res.success) {
      toastStore.success(MESSAGES.POST_UNLIKE_SUCCESS)
    } else {
      toastStore.error(MESSAGES.POST_UNLIKE_FAILURE)
    }
  }
</script>

<style scoped></style>
