<template>
  <div class="w-full md:w-1/2 md:px-6">
    <div
      class="flex w-full flex-col items-start justify-center space-y-4 border-b border-t transition-all duration-300 dark:border-slate-600 md:rounded-xl md:border"
    >
      <!-- BEGIN: HEADER SECTION -->
      <post-card-header
        :ownerUUID="ownerUUID"
        :ownerName="ownerName"
        :time="time"
        :postStories="postStories"
      />
      <!-- END: HEADER SECTION -->

      <!-- BEGIN: BODY SECTION -->
      <post-card-body
        :uuid="uuid"
        :content="content"
        :numberOfLikes="numberOfLikes"
        :isLiked="isLiked"
        :likeText="likeText"
        @on-post-like="onPostLike"
      />
      <!-- END: BODY SECTION -->

      <!-- BEGIN: FOOTER SECTION -->
      <post-card-footer
        :uuid="uuid"
        :isLiked="isLiked"
        @on-post-like="onPostLike"
        @on-post-unlike="onPostUnlike"
      />
      <!-- END: FOOTER SECTION -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import PostCardHeader from './PostCardHeader.vue'
  import PostCardBody from './PostCardBody.vue'
  import PostCardFooter from './PostCardFooter.vue'
  import type { PostLike, PostStory } from '~/types/auth'
  import { useAuthStore } from '~/stores/auth'

  interface Props {
    uuid: string
    id: string
    ownerName: string
    ownerId: string
    ownerUUID: string
    content: string
    numberOfLikes: number
    numberOfStories: number
    time: string
    postLikes: readonly PostLike[]
    postStories: readonly PostStory[]
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
    const names = props.postLikes
      .slice(0, 2)
      .map(post => {
        if (post.creator?.uuid === loggedInUserUUID.value) {
          return 'You'
        } else {
          return post.creator?.name || 'Someone'
        }
      })
      .join(props.postLikes.length === 2 ? ' and ' : ', ')

    if (props.postLikes.length > 2) {
      return `${names} and ${props.postLikes.length - 2} ${
        props.postLikes.length - 2 > 1 ? 'others' : 'other'
      } liked ${
        loggedInUserUUID.value === props.ownerUUID ? 'your post' : 'this post'
      }`
    } else if (props.postLikes.length === 0) {
      return `Be the first to like ${
        loggedInUserUUID.value === props.ownerUUID ? 'your post' : 'this post'
      }`
    } else {
      return `${names} liked ${
        loggedInUserUUID.value === props.ownerUUID ? 'your post' : 'this post'
      }`
    }
  })

  const onPostLike = (uuid: string) => {
    emit('onPostLike', uuid)
  }

  const onPostUnlike = (uuid: string) => {
    emit('onPostUnlike', uuid)
  }
</script>

<style lang="scss" scoped></style>
