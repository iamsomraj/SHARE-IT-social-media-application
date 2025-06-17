<template>
  <div class="w-full">
    <div
      v-if="user"
      class="flex w-full flex-col items-center justify-center space-y-2"
    >
      <profile-header
        :uuid="user.uuid"
        :id="user.id"
        :name="user.name"
        :email="user.email"
        :numberOfPosts="user?.person_stats?.post_count || 0"
        :numberOfFollowers="user?.person_stats?.follower_count || 0"
        :numberOfFollowings="user?.person_stats?.following_count || 0"
      />

      <post-creator />

      <profile-body
        :posts="user.person_posts"
        :name="user.name"
        @onPostLike="onPostLike"
        @onPostUnlike="onPostUnlike"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ProfileBody from '~/components/persons/ProfileBody.vue'
  import ProfileHeader from '~/components/persons/ProfileHeader.vue'
  // import PostCreator from '~/components/posts/PostCreator.vue'
  import PostCreator from '~/components/posts/PostCreator.vue'
  import { MESSAGES } from '~/utils/constants'
  import { useAuthStore } from '~/stores/auth'
  import { usePostStore } from '~/stores/post'
  import { useToastStore } from '~/stores/toast'

  const authStore = useAuthStore()
  const postStore = usePostStore()
  const toastStore = useToastStore()

  const loading = ref(false)

  const user = computed(() => authStore.user)

  onMounted(async () => {
    const uuid = authStore.uuid
    const token = authStore.token
    if (uuid && token) {
      await authStore.getSelfProfile({ uuid, token })
    }
  })

  const onPostLike = async (uuid: string) => {
    loading.value = true
    try {
      const token = authStore.token
      if (token) {
        await postStore.likePost({ postUUID: uuid, token })
        const userUuid = authStore.uuid
        if (userUuid) {
          await authStore.getSelfProfile({ uuid: userUuid, token })
        }
        toastStore.success(MESSAGES.POST_LIKE_SUCCESS)
      }
    } catch {
      toastStore.error(MESSAGES.POST_LIKE_FAILURE)
    } finally {
      loading.value = false
    }
  }

  const onPostUnlike = async (uuid: string) => {
    loading.value = true
    try {
      const token = authStore.token
      if (token) {
        await postStore.unlikePost({ postUUID: uuid, token })
        const userUuid = authStore.uuid
        if (userUuid) {
          await authStore.getSelfProfile({ uuid: userUuid, token })
        }
        toastStore.success(MESSAGES.POST_UNLIKE_SUCCESS)
      }
    } catch {
      toastStore.error(MESSAGES.POST_UNLIKE_FAILURE)
    } finally {
      loading.value = false
    }
  }
</script>
