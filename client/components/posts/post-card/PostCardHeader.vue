<template>
  <!-- BEGIN: POST CARD HEADER -->
  <div
    class="flex w-full items-center justify-between space-x-4 border-b px-6 py-4 dark:border-slate-600"
  >
    <div class="flex items-center justify-center space-x-4">
      <!-- BEGIN: POST PROFILE PICTURE -->
      <profile-picture
        :uuid="ownerUUID"
        :name="ownerName"
        class="h-8 w-8 shrink-0 text-5xl"
      />
      <!-- END: POST PROFILE PICTURE -->

      <!-- BEGIN: POST OWNER NAME AND TIME -->
      <div class="flex flex-col items-start justify-center font-bold">
        <!-- BEGIN: POST OWNER NAME -->
        <div
          @click="$router.push(`/profile/${ownerUUID}`)"
          class="cursor-pointer break-words text-3xl text-slate-600 transition-all duration-300 hover:underline dark:text-slate-200"
        >
          {{ ownerName }}
        </div>
        <!-- END: POST OWNER NAME -->

        <!-- BEGIN: POST TIME -->
        <div class="text-sm font-light text-slate-400">{{ time }}</div>
        <!-- END: POST TIME -->
      </div>
      <!-- END: POST OWNER NAME AND TIME -->
    </div>

    <div v-if="!isSelfPost">
      <div
        v-if="!isStory"
        @click="addStory"
        class="flex items-center justify-between space-x-2"
      >
        <div
          class="hidden text-xs text-slate-400 underline-offset-4 transition-all duration-300 hover:cursor-pointer hover:underline md:block"
        >
          Add this to your story
        </div>
        <story-icon
          class="h-6 w-6 cursor-pointer stroke-slate-400 transition-all duration-300 hover:scale-125 hover:fill-slate-400 dark:stroke-slate-600 hover:dark:fill-slate-600"
        />
      </div>
      <div v-else @click="removeStory">
        <story-icon
          class="h-6 w-6 cursor-pointer fill-yellow-400 stroke-yellow-400 transition-all duration-300 hover:scale-125 dark:fill-yellow-200 dark:stroke-yellow-200"
        />
      </div>
    </div>
  </div>
  <!-- END: POST CARD HEADER -->
</template>

<script setup lang="ts">
  import { MESSAGES } from '~/utils/constants'
  import StoryIcon from '../../assets/StoryIcon.vue'
  import ProfilePicture from '../../persons/ProfilePicture.vue'
  import type { PostStory } from '~/types/auth'
  import { useAuthStore } from '~/stores/auth'
  import { usePostStore } from '~/stores/post'
  import { useToastStore } from '~/stores/toast'

  interface Props {
    ownerUUID: string
    ownerName: string
    time: string
    postStories: readonly PostStory[]
  }

  const props = defineProps<Props>()

  const route = useRoute()
  const authStore = useAuthStore()
  const postStore = usePostStore()
  const toastStore = useToastStore()

  const postUUID = computed(() => route.params.uuid as string)
  const loggedInUserUUID = computed(() => authStore.uuid)
  const isSelfPost = computed(() => props.ownerUUID === loggedInUserUUID.value)

  const isStory = computed(() => {
    const listOfPersonUUIDsWhoAddedThisAsStory = props.postStories.map(
      fav => fav.creator?.uuid
    )
    return listOfPersonUUIDsWhoAddedThisAsStory.includes(loggedInUserUUID.value)
  })

  const addStory = async () => {
    try {
      const authStore = useAuthStore()
      const token = authStore.token
      if (token) {
        await postStore.addStory({ postUUID: postUUID.value, token })
        toastStore.success(MESSAGES.ADD_STORY_SUCCESS)
      }
    } catch {
      toastStore.error(MESSAGES.ADD_STORY_FAILURE)
    }
  }

  const removeStory = async () => {
    try {
      const authStore = useAuthStore()
      const token = authStore.token
      if (token) {
        await postStore.removeStory({ postUUID: postUUID.value, token })
        toastStore.success(MESSAGES.REMOVE_STORY_SUCCESS)
      }
    } catch {
      toastStore.error(MESSAGES.REMOVE_STORY_FAILURE)
    }
  }
</script>
