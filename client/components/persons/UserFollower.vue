<template>
  <div class="flex items-center justify-center">
    <primary-button
      v-if="!doesUserFollow"
      @onClick="onUserFollow"
      :loading="loading"
    >
      Follow
    </primary-button>
    <secondary-button v-else @onClick="onUserUnfollow" :loading="loading">
      Followed
    </secondary-button>
  </div>
</template>

<script setup lang="ts">
  import type { PersonFollower } from '~/types/auth'
  import { MESSAGES } from '~/utils/constants'

  const authStore = useAuthStore()
  const profileStore = useProfileStore()
  const toastStore = useToastStore()

  const loading = ref(false)

  const profile = computed(() => profileStore.profile)
  const token = computed(() => authStore.token)
  const followers = computed(() => authStore.followers)

  const doesUserFollow = computed(() => {
    return followers.value.some(
      (person: PersonFollower) => person.followed_id === profile.value.id
    )
  })

  const onUserFollow = async () => {
    loading.value = true

    try {
      const [followRes] = await Promise.all([
        profileStore.follow({
          uuid: profile.value.uuid,
          token: token.value!,
        }),
      ])

      if (followRes.state) {
        await Promise.all([
          profileStore.getUserProfile({
            uuid: profile.value.uuid,
            token: token.value!,
          }),
          authStore.checkAuth(),
        ])

        toastStore.success(MESSAGES.PERSON_FOLLOW_SUCCESS)
      } else {
        toastStore.error(MESSAGES.PERSON_FOLLOW_FAILURE)
      }
    } catch {
      toastStore.error(MESSAGES.PERSON_FOLLOW_FAILURE)
    } finally {
      loading.value = false
    }
  }

  const onUserUnfollow = async () => {
    loading.value = true

    try {
      const unfollowRes = await profileStore.unfollow({
        uuid: profile.value.uuid,
        token: token.value!,
      })

      if (unfollowRes.state) {
        await Promise.all([
          profileStore.getUserProfile({
            uuid: profile.value.uuid,
            token: token.value!,
          }),
          authStore.checkAuth(), 
        ])

        toastStore.success(MESSAGES.PERSON_UNFOLLOW_SUCCESS)
      } else {
        toastStore.error(MESSAGES.PERSON_UNFOLLOW_FAILURE)
      }
    } catch {
      toastStore.error(MESSAGES.PERSON_UNFOLLOW_FAILURE)
    } finally {
      loading.value = false
    }
  }
</script>
