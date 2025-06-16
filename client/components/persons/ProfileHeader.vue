<template>
  <div class="flex w-full flex-col items-center justify-start">
    <div class="grid w-full grid-cols-12 gap-y-4 px-6 md:w-1/2">
      <profile-picture
        :uuid="uuid"
        :name="name"
        class="col-span-4 h-16 w-16 text-8xl"
      />
      <profile-stats
        :numberOfPosts="numberOfPosts"
        :numberOfFollowers="numberOfFollowers"
        :numberOfFollowings="numberOfFollowings"
      />
      <profile-detail class="col-span-4" :name="name" :email="email" />
      <div v-if="!isSelf" class="col-span-2 md:hidden" />
      <user-follower v-if="!isSelf" class="col-span-6 md:col-span-8" />
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    uuid: string
    id: string
    name: string
    email: string
    numberOfPosts: number
    numberOfFollowers: number
    numberOfFollowings: number
  }

  const props = defineProps<Props>()
  const { $pinia } = useNuxtApp()
  const authStore = useAuthStore($pinia)

  const isSelf = computed(() => {
    return props.uuid === authStore.user.uuid
  })
</script>

<style scoped></style>
