<template>
  <!-- BEGIN: POST SECTION -->
  <div
    class="flex h-3/4 w-full flex-col break-words border-b border-t dark:border-slate-600 md:w-1/4 md:rounded-xl md:border"
  >
    <!-- BEGIN: LOADER SECTION -->
    <div class="h-0.5 w-full rounded-full px-4 py-2">
      <div
        class="h-0.5 rounded-full bg-blue-400"
        :style="`width: ${loadingPercentage}%`"
      />
    </div>
    <!-- END: LOADER SECTION -->

    <!-- BEGIN: HEADER SECTION -->
    <div
      class="flex items-center justify-start space-x-2 border-b px-6 py-4 dark:border-slate-600"
    >
      <profile-picture
        :uuid="postAuthor.uuid"
        :name="postAuthor.name"
        class="h-8 w-8 text-5xl"
      />
      <div
        @click="$router.push(`/profile/${postAuthor.uuid}`)"
        class="line-clamp-1 break-words text-sm hover:cursor-pointer hover:underline hover:underline-offset-4"
      >
        {{ postAuthor.name }}
      </div>
      <div class="mx-2 text-sm text-slate-400">
        {{ time(selectedStory.created_at, selectedPost.created_at) }}
      </div>
    </div>
    <!-- END: HEADER SECTION -->

    <!-- BEGIN: BODY SECTION -->
    <div
      class="flex-grow border-b px-6 py-4 hover:cursor-pointer hover:underline hover:underline-offset-4 dark:border-slate-600"
      @click="$router.push(`/post/${selectedPost.uuid}`)"
    >
      {{ postContent }}
    </div>
    <!-- END: BODY SECTION -->

    <!-- BEGIN: FOOTER -->
    <div
      class="flex items-center justify-start space-x-2 border-t px-6 py-4 dark:border-t-slate-600"
    >
      <!-- BEGIN: VIEW ICON WHEN POST IS NOT LIKED -->
      <div
        v-if="!isLiked"
        class="flex cursor-pointer items-center justify-center space-x-4 decoration-slate-400 hover:underline hover:underline-offset-4"
        @click="$router.push(`/post/${selectedPost.uuid}`)"
      >
        <view-icon class="h-5 w-5 fill-transparent stroke-slate-400" />
        <div class="text-sm text-slate-400">View this post</div>
      </div>
      <!-- END: VIEW ICON WHEN POST IS NOT LIKED -->

      <!-- BEGIN: LIKE ICON WHEN POST IS LIKED -->
      <div v-else class="flex items-center justify-center space-x-4">
        <heart-icon class="h-5 w-5 fill-red-400 stroke-red-400" />
        <div class="text-sm text-slate-400">You liked this</div>
      </div>
      <!-- END: LIKE ICON WHEN POST IS LIKED -->
    </div>
    <!-- END: FOOTER -->
  </div>
  <!-- END: POST SECTION -->
</template>

<script setup lang="ts">
  import { getTime } from '~/utils/helpers'
  import ProfilePicture from '../../persons/ProfilePicture.vue'
  import ViewIcon from '../../assets/ViewIcon.vue'
  import HeartIcon from '../../assets/HeartIcon.vue'
  import type { Post, PostStory, User } from '~/types/auth'

  interface Props {
    selectedPost: Post
    selectedStory: PostStory
    postAuthor: User
    isLiked: boolean
    loadingPercentage: number
    postContent: string
  }

  defineProps<Props>()

  const time = (updated_at?: string, created_at?: string) => {
    const timeToUse = updated_at || created_at
    if (!timeToUse) return ''
    return getTime(timeToUse, true)
  }
</script>
