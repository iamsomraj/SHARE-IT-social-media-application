<template>
  <div class="flex flex-col items-start justify-center space-y-4 px-6">
    <div
      class="cursor-pointer text-2xl wrap-break-word text-slate-600 underline-offset-4 transition-all duration-300 hover:underline md:text-4xl dark:text-slate-200"
      @click="$router.push(`/post/${uuid}`)"
    >
      {{ content }}
    </div>

    <div
      v-if="props.numberOfLikes === 0"
      @click="onPostLike(uuid)"
      class="line-clamp-1 cursor-pointer text-base wrap-break-word text-slate-400 underline-offset-4 hover:text-red-400 hover:underline dark:hover:text-red-200"
    >
      {{ likeText }}
    </div>
    <div
      v-else
      class="line-clamp-1 cursor-pointer text-base wrap-break-word text-slate-400 underline-offset-4 hover:underline"
    >
      {{ likeText }}
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    uuid: string
    content: string
    numberOfLikes: number
    isLiked: boolean
    likeText: string
  }

  interface Emits {
    onPostLike: [uuid: string]
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const onPostLike = (uuid: string) => {
    emit('onPostLike', uuid)
  }
</script>
