<template>
  <div class="w-full">
    <post-list
      :posts="posts"
      @onPostLike="onPostLike"
      @onPostUnlike="onPostUnlike"
    />
  </div>
</template>

<script setup lang="ts">
  import type { Post } from '~/types/auth'

  interface Props {
    posts: readonly Post[]
    name: string
  }

  interface Emits {
    onPostLike: [uuid: string]
    onPostUnlike: [uuid: string]
    onUserFollow: [uuid: string]
  }

  defineProps<Props>()
  const emit = defineEmits<Emits>()

  const onPostLike = (uuid: string) => {
    emit('onPostLike', uuid)
  }

  const onPostUnlike = (uuid: string) => {
    emit('onPostUnlike', uuid)
  }
</script>

<style lang="scss" scoped></style>
