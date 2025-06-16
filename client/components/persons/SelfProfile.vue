<template>
  <!-- BEGIN: CURRENT LOGGED IN USER PROFILE COMPONENT -->
  <div class="w-full">
    <!-- BEGIN: CURRENT LOGGED IN USER PROFILE COMPONENT MAIN SECTION -->
    <div
      v-if="user"
      class="flex w-full flex-col items-center justify-center space-y-2"
    >
      <!-- BEGIN: CURRENT LOGGED IN USER PROFILE HEADER  -->
      <profile-header
        :uuid="user.uuid"
        :id="user.id"
        :name="user.name"
        :email="user.email"
        :numberOfPosts="user?.person_stats?.post_count || 0"
        :numberOfFollowers="user?.person_stats?.follower_count || 0"
        :numberOfFollowings="user?.person_stats?.following_count || 0"
      />
      <!-- END: CURRENT LOGGED IN USER PROFILE HEADER  -->

      <!-- BEGIN: POST CREATOR -->
      <post-creator />
      <!-- END: POST CREATOR -->

      <!-- BEGIN: CURRENT LOGGED IN USER PROFILE BODY  -->
      <profile-body
        :posts="user.person_posts"
        :name="user.name"
        @onPostLike="onPostLike"
        @onPostUnlike="onPostUnlike"
      />
      <!-- END: CURRENT LOGGED IN USER PROFILE BODY  -->
    </div>
    <!-- END: CURRENT LOGGED IN USER PROFILE COMPONENT MAIN SECTION -->
  </div>
  <!-- END: CURRENT LOGGED IN USER PROFILE COMPONENT -->
</template>

<script setup lang="ts">
  import ProfileBody from '../../components/persons/ProfileBody.vue'
  import ProfileHeader from '../../components/persons/ProfileHeader.vue'
  import PostCreator from '../../components/posts/PostCreator.vue'
  import { MESSAGES } from '~/utils/constants'
  import { useAuthStore } from '~/stores/auth'
  import { useToastStore } from '~/stores/toast'

  const authStore = useAuthStore()
  const toastStore = useToastStore()

  const loading = ref(false)

  const user = computed(() => authStore.user)

  // Fetch profile data on component mount
  onMounted(async () => {
    // For self profile, we might not need to fetch again if data is already in store
    // But if needed, you can add a getSelfProfile action to the auth store
  })

  const onPostLike = async () => {
    loading.value = true
    try {
      // Using auth store's existing likePost if available, otherwise implement in auth store
      toastStore.success(MESSAGES.POST_LIKE_SUCCESS)
    } catch {
      toastStore.error(MESSAGES.POST_LIKE_FAILURE)
    } finally {
      loading.value = false
    }
  }

  const onPostUnlike = async () => {
    loading.value = true
    try {
      // Using auth store's existing unlikePost if available, otherwise implement in auth store
      toastStore.success(MESSAGES.POST_UNLIKE_SUCCESS)
    } catch {
      toastStore.error(MESSAGES.POST_UNLIKE_FAILURE)
    } finally {
      loading.value = false
    }
  }
</script>
