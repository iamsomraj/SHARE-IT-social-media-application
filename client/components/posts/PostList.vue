<template>
  <div class="my-2 flex flex-col items-center space-y-2 px-0 md:px-12">
    <post-list-item
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :uuid="post.uuid"
      :ownerName="post.creator?.name || 'Unknown'"
      :ownerId="post.creator?.id || 0"
      :ownerUUID="post.creator?.uuid || ''"
      :postLikes="post.post_likes || []"
      :content="post.content"
      :numberOfLikes="post.post_stats?.like_count || 0"
      :time="time(post.updated_at, post.created_at)"
      @onPostLike="onPostLike"
      @onPostUnlike="onPostUnlike"
    />
  </div>
</template>

<script setup lang="ts">
  import { getTime } from '~/utils/helpers'
  import type { Post } from '~/types/auth'

  interface Props {
    posts: readonly Post[]
  }

  interface Emits {
    onPostLike: [uuid: string]
    onPostUnlike: [uuid: string]
  }

  defineProps<Props>()
  const emit = defineEmits<Emits>()

  const time = (updated_at: string, created_at: string) => {
    return getTime(updated_at ? updated_at : created_at)
  }

  const onPostLike = (uuid: string) => {
    emit('onPostLike', uuid)
  }

  const onPostUnlike = (uuid: string) => {
    emit('onPostUnlike', uuid)
  }
</script>

<style scoped></style>
