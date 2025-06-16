<template>
  <div
    class="flex min-h-screen w-full items-start justify-center pb-16 pt-4 text-slate-600 dark:bg-slate-800 dark:text-slate-200 md:py-8"
  >
    <post-card
      v-if="post"
      :key="post.uuid"
      :id="post.uuid"
      :uuid="post.uuid"
      :ownerName="post.creator?.name || 'Unknown'"
      :ownerId="post.creator?.id || ''"
      :ownerUUID="post.creator?.uuid || ''"
      :postLikes="post.post_likes || []"
      :content="post.content"
      :numberOfLikes="post.post_stats?.like_count || 0"
      :numberOfStories="post.post_stats?.story_count || 0"
      :time="time(post.updated_at, post.created_at)"
      :postStories="post.post_stories || []"
      @onPostLike="onPostLike"
      @onPostUnlike="onPostUnlike"
    />
  </div>
</template>

<script setup lang="ts">
  import { MESSAGES } from '~/utils/constants'
  import { getTime } from '~/utils/helpers'

  definePageMeta({
    middleware: 'authenticated',
  })

  const route = useRoute()
  const authStore = useAuthStore()
  const postStore = usePostStore()
  const toastStore = useToastStore()

  const token = computed(() => authStore.token)
  const uuid = computed(() => route.params.uuid as string)
  const post = computed(() => postStore.post)

  // Fetch post data on page load
  await postStore.fetchPost({ uuid: uuid.value, token: token.value || '' })

  const time = (updated_at: string, created_at: string) => {
    return getTime(updated_at ? updated_at : created_at)
  }

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
