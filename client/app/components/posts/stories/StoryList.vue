<template>
  <!-- BEGIN: STORY POST SECTIONS -->
  <div class="flex w-full justify-center md:px-12">
    <!-- BEGIN: STORY CARD -->
    <story-item-screen
      v-if="showCard && selectedId"
      @dismiss="onCardClose"
      :posts="stories"
      :selectedId="selectedId"
    />
    <!-- END: STORY CARD -->

    <!-- BEGIN: ROOT LIST SECTION -->
    <div
      class="flex w-full items-start justify-start space-x-2 border-t border-b px-2 py-3 md:w-1/2 md:rounded-xl md:border md:px-4 md:py-6 dark:border-slate-600"
    >
      <!-- BEGIN: OTHER STORY POST ITEMS SECTION -->
      <div
        class="no-scrollbar flex items-center justify-start space-x-2 overflow-x-auto overscroll-x-contain scroll-smooth"
      >
        <!-- BEGIN: STORY POST ITEM -->
        <div
          v-for="post in stories"
          :key="post.id"
          class="flex flex-col items-center justify-center space-y-2 py-2 transition-all duration-300 hover:scale-105"
          @click="onPostClick(post.id)"
        >
          <!-- CIRCLE SECTION -->
          <div
            class="flex h-12 w-12 rotate-45 cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-yellow-400 text-center text-7xl font-extrabold text-white capitalize shadow-inner transition-all duration-300 dark:border-none"
          >
            {{ post.creator?.name?.[0] || 'U' }}
          </div>

          <!-- NAME SECTION -->
          <div
            class="text-xsF line-clamp-1 w-20 cursor-pointer text-center text-sm wrap-break-word text-slate-400 hover:underline"
          >
            {{ post.creator?.name || 'Unknown' }}
          </div>
        </div>
        <!-- END: STORY POST ITEM -->
      </div>
      <!-- END: OTHER STORY POST ITEMS SECTION -->
    </div>
    <!-- END: ROOT LIST SECTION -->
  </div>
  <!-- END: STORY POST SECTIONS -->
</template>

<script setup lang="ts">
  import type { Post } from '~/types/auth'

  interface Props {
    stories: readonly Post[]
  }

  const props = defineProps<Props>()

  const showCard = ref(false)
  const selectedId = ref<string | null>(null)

  const onPostClick = (id: number) => {
    showCard.value = true
    const post = props.stories.find((story: Post) => story.id === id)
    selectedId.value = post?.uuid || null
  }

  const onCardClose = () => {
    showCard.value = false
    selectedId.value = null
  }
</script>
