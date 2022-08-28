<template>
  <!-- BEGIN: POST SECTION -->
  <div
    class="flex h-3/4 w-full flex-col break-words border-t border-b dark:border-slate-600 md:w-1/4 md:rounded-xl md:border"
  >
    <!-- BEGIN: LOADER SECTION -->
    <div class="h-0.5 w-full rounded-full px-4 py-2">
      <div
        class="h-0.5 rounded-full bg-blue-400"
        :style="`width: ${loadingPercentage}%`"
      ></div>
    </div>
    <!-- END: LOADER SECTION -->

    <!-- BEGIN: HEADER SECTION -->
    <div
      class="flex items-center justify-start space-x-2 border-b py-4 px-6 dark:border-slate-600"
    >
      <profile-picture
        :uuid="postAuthor.uuid"
        :name="postAuthor.name"
        class="h-8 w-8 text-5xl"
      ></profile-picture>
      <div
        @click="$router.push(`/profile/${postAuthor.uuid}`)"
        class="break-words text-sm line-clamp-1 hover:cursor-pointer hover:underline hover:underline-offset-4"
      >
        {{ postAuthor.name }}
      </div>
      <div class="mx-2 text-sm text-slate-400">
        {{ time(selectedFavouriteRecord.created_at, selectedPost.created_at) }}
      </div>
    </div>
    <!-- END: HEADER SECTION -->

    <!-- BEGIN: BODY SECTION -->
    <div
      class="flex-grow border-b py-4 px-6 hover:cursor-pointer hover:underline hover:underline-offset-4 dark:border-slate-600"
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
        @click="$router.push(`post/${selectedPost.uuid}`)"
      >
        <view-icon
          class="h-5 w-5 fill-transparent stroke-slate-400"
        ></view-icon>
        <div class="text-sm text-slate-400">View this post</div>
      </div>
      <!-- END: VIEW ICON WHEN POST IS NOT LIKED -->

      <!-- BEGIN: LIKE ICON WHEN POST IS LIKED -->
      <div v-else class="flex items-center justify-center space-x-4">
        <heart-icon class="h-5 w-5 fill-red-400 stroke-red-400"></heart-icon>
        <div class="text-sm text-slate-400">You liked this</div>
      </div>
      <!-- END: LIKE ICON WHEN POST IS LIKED -->
    </div>
    <!-- END: FOOTER -->
  </div>
  <!-- END: POST SECTION -->
</template>

<script>
import { getTime } from '../../../util/helpers';
import ProfilePicture from '../../persons/ProfilePicture.vue';
import ViewIcon from '../../assets/ViewIcon.vue';
import HeartIcon from '../../assets/HeartIcon.vue';

export default {
  name: 'StoryItemScreen',
  props: {
    selectedPost: {
      type: Object,
      required: true,
    },
    selectedFavouriteRecord: {
      type: Object,
      required: true,
    },
    postAuthor: {
      type: Object,
      required: true,
    },
    isLiked: {
      type: Boolean,
      required: true,
    },
    loadingPercentage: {
      type: Number,
      required: true,
    },
    postContent: {
      type: String,
      required: true,
    },
  },
  methods: {
    time(updated_at, created_at) {
      return getTime(updated_at ? updated_at : created_at, true);
    },
  },
  components: {
    ProfilePicture,
    ViewIcon,
    HeartIcon,
  },
};
</script>
