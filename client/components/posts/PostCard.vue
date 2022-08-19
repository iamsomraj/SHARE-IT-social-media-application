<template>
  <div
    class="flex w-full flex-col items-start justify-center space-y-4 border-t border-b transition-all duration-300 dark:border-slate-600 md:w-1/2 md:rounded-xl md:border"
  >
    <!-- BEGIN: POST CARD HEADER -->
    <div
      class="flex w-full items-center justify-start space-x-4 border-b px-6 py-4 dark:border-slate-600"
    >
      <!-- BEGIN: POST PROFILE PICTURE -->
      <profile-picture
        :uuid="ownerUUID"
        :name="ownerName"
        class="h-8 w-8 shrink-0 text-5xl"
      ></profile-picture>
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
    <!-- END: POST CARD HEADER -->

    <!-- BEGIN: POST CARD CONTENT -->
    <div class="flex flex-col items-start justify-center space-y-4 px-6">
      <!-- BEGIN: POST CONTENT -->
      <div
        class="cursor-pointer break-words text-2xl text-slate-600 transition-all duration-300 hover:underline dark:text-slate-200 md:text-4xl"
        @click="$router.push(`/post/${uuid}`)"
      >
        {{ content }}
      </div>
      <!-- END: POST CONTENT -->

      <!-- BEGIN: NUMBER OF LIKES -->
      <div
        class="cursor-pointer break-words text-base text-slate-400 underline-offset-4 line-clamp-1 hover:underline"
      >
        {{ likeText }}
      </div>
      <!-- END: NUMBER OF LIKES -->
    </div>
    <!-- END: POST CARD CONTENT -->

    <!-- BEGIN: POST CARD FOOTER -->
    <div
      class="flex w-full items-center justify-start space-x-2 border-t px-6 py-2 text-xs dark:border-t-slate-600"
    >
      <!-- BEGIN: LIKE ICON -->
      <div
        v-if="!isLiked"
        class="flex cursor-pointer items-center justify-center space-x-4"
        @click="onPostLike(uuid)"
      >
        <heart-icon
          class="fill-transparent stroke-slate-400 hover:fill-slate-400 active:fill-slate-400"
        ></heart-icon>
      </div>
      <!-- END: LIKE ICON -->
      <!-- BEGIN: LIKE ICON -->
      <div
        v-else
        class="flex cursor-pointer items-center justify-center space-x-4"
        @click="onPostUnlike(uuid)"
      >
        <heart-icon
          class="fill-red-400 stroke-red-400 hover:fill-red-200 hover:stroke-red-200 active:stroke-red-200"
        ></heart-icon>
      </div>
      <!-- END: LIKE ICON -->
    </div>
    <!-- END: POST CARD FOOTER -->
  </div>
</template>

<script>
import ProfilePicture from '../persons/ProfilePicture.vue';
import HeartIcon from './../assets/HeartIcon.vue';
export default {
  name: 'PostCard',
  props: [
    'uuid',
    'id',
    'ownerName',
    'ownerId',
    'ownerUUID',
    'content',
    'numberOfLikes',
    'time',
    'postLikes',
  ],
  computed: {
    likeText() {
      const names = this.postLikes
        .slice(0, 2)
        .map((post) => post.creator.name)
        .join(', ');
      if (this.postLikes.length > 2) {
        return `${names} and ${this.postLikes.length - 2} ${
          this.postLikes.length - 2 > 1 ? 'others' : 'other'
        } liked this`;
      } else if (this.postLikes.length === 0) {
        return 'Be the first to like this';
      } else {
        return `${names} liked this`;
      }
    },
    loggedInUserUUID() {
      return this.$store.getters['auth/uuid'];
    },
    isLiked() {
      return this.postLikes?.some(
        (likeRecord) => likeRecord?.creator?.uuid === this.loggedInUserUUID
      );
    },
  },
  methods: {
    onPostLike(uuid) {
      this.$emit('onPostLike', uuid);
    },
    onPostUnlike(uuid) {
      this.$emit('onPostUnlike', uuid);
    },
  },
  components: { ProfilePicture, HeartIcon },
};
</script>

<style lang="scss" scoped></style>
