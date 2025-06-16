<template>
  <div
    class="fixed inset-0 z-20 flex max-h-screen w-screen items-center justify-center bg-white transition-all duration-300 dark:bg-slate-800 dark:text-slate-200"
  >
    <!-- BEGIN: INNER SECTION -->
    <div class="flex h-full w-full flex-col items-center justify-start">
      <!-- BEGIN: HEADER BAR -->
      <div class="flex w-full items-center justify-between px-6 py-6 md:px-12">
        <!-- BEGIN: LEFT SECTION -->
        <div class="cursor-pointer" @click="$emit('dismiss')">
          <!-- BEGIN: LOGO SECTION -->
          <div
            class="flex items-center justify-center space-x-2 rounded text-2xl font-extrabold tracking-tighter"
          >
            <span class="text-blue-400">SHARE</span>
            <span class="text-yellow-400">IT</span>
          </div>
          <!-- END: LOGO SECTION -->
        </div>
        <!-- END: LEFT SECTION -->

        <!-- BEGIN: RIGHT SECTION -->
        <div
          class="cursor-pointer rounded-xl border-2 border-transparent bg-inherit hover:border-2 hover:border-slate-200 dark:hover:border-slate-600"
          @click="$emit('dismiss')"
        >
          <CrossIcon class="m-2 h-6 w-6 stroke-2" />
        </div>
        <!-- END: RIGHT SECTION -->
      </div>
      <!-- END: HEADER BAR -->

      <!-- BEGIN: POST SECTION -->
      <StoryItem
        v-if="selectedPost && selectedStory && postAuthor"
        :selectedPost="selectedPost"
        :selectedStory="selectedStory"
        :postContent="postContent"
        :postAuthor="postAuthor"
        :isLiked="isLiked"
        :loadingPercentage="loadingPercentage"
      />
      <!-- END: POST SECTION -->
    </div>
    <!-- END: INNER SECTION -->
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
  import CrossIcon from '../../assets/CrossIcon.vue'
  import StoryItem from './StoryItem.vue'
  import type { Post } from '~/types/auth'
  import { useAuthStore } from '~/stores/auth'

  interface Props {
    posts: readonly Post[]
    selectedId: string | null
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    dismiss: []
  }>()

  const authStore = useAuthStore()
  const loadingPercentage = ref(0)

  const loggedInUserUUID = computed(() => authStore.uuid)

  const selectedPost = computed(() => {
    return props.posts.find(post => post.uuid === props.selectedId)
  })

  const selectedStory = computed(() => {
    if (!selectedPost.value?.post_stories) return null
    return selectedPost.value.post_stories.find(record => {
      return record.creator?.uuid === loggedInUserUUID.value
    })
  })

  const postContent = computed(() => selectedPost.value?.content || '')

  const postAuthor = computed(() => selectedPost.value?.creator)

  const isLiked = computed(() => {
    return (
      selectedPost.value?.post_likes?.some(
        likeRecord =>
          likeRecord?.creator?.uuid === loggedInUserUUID.value ||
          likeRecord?.person?.uuid === loggedInUserUUID.value
      ) || false
    )
  })

  const setTimer = () => {
    const time = 50
    let i = 0
    const interval = setInterval(() => {
      i++
      loadingPercentage.value = i
      if (i >= 100) {
        clearInterval(interval)
        emit('dismiss')
        return
      }
    }, time)
  }

  onMounted(() => {
    const body = document.querySelector('body')
    if (body) {
      body.style.overflow = 'hidden'
    }
    setTimer()
  })

  onBeforeUnmount(() => {
    const body = document.querySelector('body')
    if (body) {
      body.style.overflow = 'auto'
    }
  })
</script>
0
