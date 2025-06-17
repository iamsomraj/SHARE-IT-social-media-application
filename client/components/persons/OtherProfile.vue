<template>
  <div class="w-full">
    <div
      v-if="profile"
      class="flex w-full flex-col items-center justify-center space-y-2"
    >
      <profile-header
        :uuid="profile.uuid"
        :id="profile.id"
        :name="profile.name"
        :email="profile.email"
        :numberOfPosts="profile?.person_stats?.post_count || 0"
        :numberOfFollowers="profile?.person_stats?.follower_count || 0"
        :numberOfFollowings="profile?.person_stats?.following_count || 0"
      />

      <profile-body
        :posts="person_posts"
        :name="profile.name"
        @onPostLike="onPostLike"
        @onPostUnlike="onPostUnlike"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ProfileBody from '~/components/persons/ProfileBody.vue'
  import ProfileHeader from '~/components/persons/ProfileHeader.vue'
  import { MESSAGES } from '~/utils/constants'
  import { useAuthStore } from '~/stores/auth'
  import { useProfileStore } from '~/stores/profile'
  import { useToastStore } from '~/stores/toast'

  const route = useRoute()
  const authStore = useAuthStore()
  const profileStore = useProfileStore()
  const toastStore = useToastStore()

  const loading = ref(false)

  const person_posts = computed(() => profileStore.posts)
  const profile = computed(() => profileStore.profile)

  onMounted(async () => {
    const uuid = route.params.uuid as string
    const token = authStore.token
    if (token) {
      await profileStore.getUserProfile({ uuid, token })
    }
  })

  const onPostLike = async (uuid: string) => {
    loading.value = true
    try {
      const token = authStore.token
      if (token) {
        await profileStore.likePost({ postUUID: uuid, token })
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
        await profileStore.unlikePost({ postUUID: uuid, token })
        toastStore.success(MESSAGES.POST_UNLIKE_SUCCESS)
      }
    } catch {
      toastStore.error(MESSAGES.POST_UNLIKE_FAILURE)
    } finally {
      loading.value = false
    }
  }
</script>
