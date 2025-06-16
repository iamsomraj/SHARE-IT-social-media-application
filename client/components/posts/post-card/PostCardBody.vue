<template>
  <!-- BEGIN: POST CARD CONTENT -->
  <div class="flex flex-col items-start justify-center space-y-4 px-6">
    <!-- BEGIN: POST CONTENT -->
    <div
      class="cursor-pointer break-words text-2xl text-slate-600 underline-offset-4 transition-all duration-300 hover:underline dark:text-slate-200 md:text-4xl"
      @click="$router.push(`/post/${uuid}`)"
    >
      {{ content }}
    </div>
    <!-- END: POST CONTENT -->

    <!-- BEGIN: NUMBER OF LIKES -->
    <div
      v-if="props.numberOfLikes === 0"
      @click="onPostLike(uuid)"
      class="line-clamp-1 cursor-pointer break-words text-base text-slate-400 underline-offset-4 hover:text-red-400 hover:underline dark:hover:text-red-200"
    >
      {{ likeText }}
    </div>
    <div
      v-else
      class="line-clamp-1 cursor-pointer break-words text-base text-slate-400 underline-offset-4 hover:underline"
    >
      {{ likeText }}
    </div>
    <!-- END: NUMBER OF LIKES -->
  </div>
  <!-- END: POST CARD CONTENT -->
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
