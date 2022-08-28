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
            {{
              time(selectedFavouriteRecord.created_at, selectedPost.created_at)
            }}
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
            <heart-icon
              class="h-5 w-5 fill-red-400 stroke-red-400"
            ></heart-icon>
            <div class="text-sm text-slate-400">You liked this</div>
          </div>
          <!-- END: LIKE ICON WHEN POST IS LIKED -->
        </div>
        <!-- END: FOOTER -->
      </div>
      <!-- END: POST SECTION -->
    </div>
    <!-- END: INNER SECTION -->
  </div>
</template>

<script>
import { getTime } from '../../../util/helpers';
import CrossIcon from '../../assets/CrossIcon.vue';
import HeartIcon from '../../assets/HeartIcon.vue';
import ViewIcon from '../../assets/ViewIcon.vue';
import ProfilePicture from '../../persons/ProfilePicture.vue';

export default {
  name: 'StoryItemScreen',
  data() {
    return {
      loadingPercentage: 0,
    };
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
    selectedId: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
    this.setTimer();
  },
  beforeDestroy() {
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
  },
  computed: {
    loggedInUserUUID() {
      return this.$store.getters['auth/uuid'];
    },
    selectedPost() {
      return this.posts.find((post) => post.id === this.selectedId);
    },
    selectedFavouriteRecord() {
      return this.selectedPost.person_post_favourites.find((record) => {
        return record.creator.uuid === this.loggedInUserUUID;
      });
    },
    postContent() {
      return this.selectedPost.content;
    },
    postAuthor() {
      return this.selectedPost.creator;
    },
    isLiked() {
      return this.selectedPost.post_likes?.some(
        (likeRecord) => likeRecord?.creator?.uuid === this.loggedInUserUUID
      );
    },
  },
  methods: {
    time(updated_at, created_at) {
      return getTime(updated_at ? updated_at : created_at, true);
    },
    setTimer() {
      const time = 50;
      let i = 0;
      const interval = setInterval(() => {
        i++;
        this.loadingPercentage = i;
        if (i >= 100) {
          clearInterval(interval);
          this.$emit('dismiss');
          return;
        }
      }, time);
    },
  },
  emits: ['dismiss'],
  components: { ViewIcon, CrossIcon, ProfilePicture, HeartIcon },
};
</script>
0
