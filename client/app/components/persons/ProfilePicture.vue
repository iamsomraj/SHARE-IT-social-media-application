<template>
  <div
    class="flex rotate-45 cursor-pointer items-center justify-center overflow-hidden rounded-full border text-center font-extrabold capitalize text-white shadow-inner transition-all duration-300 hover:scale-110 dark:border-none"
    @click="$router.push(`/profile/${uuid}`)"
    :class="{
      'bg-blue-400': isSelf,
      'bg-yellow-400': !isSelf,
    }"
  >
    {{ initialLetterOfName }}
  </div>
</template>

<script setup lang="ts">
  import type { ProfilePictureProps } from '~/types/auth'

  const props = defineProps<ProfilePictureProps>()
  const authStore = useAuthStore()

  const initialLetterOfName = computed(() => {
    return props.name.charAt(0)
  })

  const isSelf = computed(() => {
    return authStore.user.uuid === props.uuid
  })
</script>
