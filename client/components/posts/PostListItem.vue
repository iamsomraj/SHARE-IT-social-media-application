<template>
  <div
    class="flex w-full flex-col items-start justify-center space-y-4 border-b border-t transition-all duration-300 dark:border-slate-600 md:w-1/2 md:rounded-xl md:border"
  >
    <div class="flex items-center justify-start space-x-4 px-6 pt-2">
      <profile-picture
        :uuid="ownerUUID"
        :name="ownerName"
        class="h-8 w-8 text-5xl"
      />

      <div class="flex flex-col items-start justify-center font-bold">
        <div
          @click="$router.push(`/profile/${ownerUUID}`)"
          class="cursor-pointer text-slate-600 transition-all duration-300 hover:underline dark:text-slate-200"
        >
          {{ ownerName }}
        </div>

        <div class="text-xs font-light text-slate-400">{{ time }}</div>
      </div>
    </div>

    <div class="flex flex-col items-start justify-center space-y-4 px-6">
      <div
        class="cursor-pointer break-words text-2xl text-slate-600 underline-offset-4 transition-all duration-300 hover:underline dark:text-slate-200"
        @click="$router.push(`/post/${uuid}`)"
      >
        {{ content }}
      </div>

      <div
        v-if="numberOfLikes === 0"
        class="cursor-pointer text-sm text-slate-400 underline-offset-4 hover:text-red-400 hover:underline dark:hover:text-red-200"
        @click="onPostLike(uuid)"
      >
        {{ likeText }}
      </div>
      <div
        v-else
        class="text-sm text-slate-400 underline-offset-4 hover:underline"
      >
        {{ likeText }}
      </div>
    </div>

    <div
      class="flex w-full items-center justify-start space-x-2 border-t px-6 py-2 text-xs dark:border-t-slate-600"
    >
      <div
        v-if="!isLiked"
        class="flex cursor-pointer items-center justify-center space-x-4"
        @click="onPostLike(uuid)"
      >
        <heart-icon
          class="fill-transparent stroke-slate-400 hover:fill-slate-400 active:fill-slate-400"
        />
      </div>
      <div
        v-else
        class="flex cursor-pointer items-center justify-center space-x-4"
        @click="onPostUnlike(uuid)"
      >
        <heart-icon
          class="fill-red-400 stroke-red-400 hover:fill-red-200 hover:stroke-red-200 active:stroke-red-200"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ProfilePicture from '~/components/persons/ProfilePicture.vue'
  import HeartIcon from '~/components/assets/HeartIcon.vue'
  import type { PostLike } from '~/types/auth'
  import { useAuthStore } from '~/stores/auth'

  interface Props {
    uuid: string
    ownerName: string
    ownerId: number
    ownerUUID: string
    content: string
    numberOfLikes: number
    time: string
    postLikes: readonly PostLike[]
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    onPostLike: [uuid: string]
    onPostUnlike: [uuid: string]
  }>()

  const authStore = useAuthStore()

  const loggedInUserUUID = computed(() => authStore.uuid)

  const isLiked = computed(() => {
    return props.postLikes?.some(
      likeRecord => likeRecord?.creator?.uuid === loggedInUserUUID.value
    )
  })

  const likeText = computed(() => {
    return props.numberOfLikes == 0
      ? 'Be the first to like this post'
      : props.numberOfLikes > 1
        ? `${props.numberOfLikes} likes`
        : `${props.numberOfLikes} like`
  })

  const onPostLike = (uuid: string) => {
    emit('onPostLike', uuid)
  }

  const onPostUnlike = (uuid: string) => {
    emit('onPostUnlike', uuid)
  }
</script>

<style lang="scss" scoped></style>
