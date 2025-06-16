<template>
  <div class="flex items-center justify-center">
    <primary-button
      v-if="!doesUserFollow"
      @onClick="onUserFollow"
      :loading="loading"
    >
      Follow
    </primary-button>
    <secondary-button v-else @onClick="onUserUnfollow" :loading="loading"
      >Followed</secondary-button
    >
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
      const res = await profileStore.follow({
        uuid: profile.value.uuid,
        token: token.value!,
      })
      loading.value = false

      if (res.state) {
        toastStore.success(MESSAGES.PERSON_FOLLOW_SUCCESS)
        await profileStore.getUserProfile({
          uuid: profile.value.uuid,
          token: token.value!,
        })
      } else {
        toastStore.error(MESSAGES.PERSON_FOLLOW_FAILURE)
      }
    } catch {
      loading.value = false
      toastStore.error(MESSAGES.PERSON_FOLLOW_FAILURE)
    }
  }

  const onUserUnfollow = async () => {
    loading.value = true

    try {
      const res = await profileStore.unfollow({
        uuid: profile.value.uuid,
        token: token.value!,
      })
      loading.value = false

      if (res.state) {
        toastStore.success(MESSAGES.PERSON_UNFOLLOW_SUCCESS)
        await profileStore.getUserProfile({
          uuid: profile.value.uuid,
          token: token.value!,
        })
      } else {
        toastStore.error(MESSAGES.PERSON_UNFOLLOW_FAILURE)
      }
    } catch {
      loading.value = false
      toastStore.error(MESSAGES.PERSON_UNFOLLOW_FAILURE)
    }
  }
</script>
