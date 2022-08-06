<template>
  <div
    class="flex w-full flex-col items-start justify-center space-y-4 rounded-none border md:w-1/2 md:rounded-xl"
  >
    <!-- BEGIN: POST LIST ITEM HEADER -->
    <div class="flex items-center justify-start space-x-4 px-6 pt-2">
      <!-- BEGIN: POST PROFILE PICTURE -->
      <profile-picture
        :uuid="ownerUUID"
        :name="ownerName"
        class="h-8 w-8 text-5xl"
      ></profile-picture>
      <!-- END: POST PROFILE PICTURE -->

      <!-- BEGIN: POST OWNER NAME AND TIME -->
      <div class="flex flex-col items-start justify-center font-bold">
        <!-- BEGIN: POST OWNER NAME -->
        <div
          @click="$router.push(`/profile/${ownerUUID}`)"
          class="cursor-pointer hover:underline"
        >
          {{ ownerName }}
        </div>
        <!-- END: POST OWNER NAME -->

        <!-- BEGIN: POST TIME -->
        <div class="text-xs font-light">{{ time }}</div>
        <!-- END: POST TIME -->
      </div>
      <!-- END: POST OWNER NAME AND TIME -->
    </div>
    <!-- END: POST LIST ITEM HEADER -->

    <!-- BEGIN: POST LIST ITEM CONTENT -->
    <div class="flex flex-col items-start justify-center space-y-4 px-6">
      <!-- BEGIN: POST CONTENT -->
      <div
        class="cursor-pointer break-words text-2xl hover:underline"
        @click="$router.push(`/post/${uuid}`)"
      >
        {{ content }}
      </div>
      <!-- END: POST CONTENT -->

      <!-- BEGIN: NUMBER OF LIKES -->
      <div class="cursor-pointer text-sm underline-offset-4 hover:underline">
        {{
          numberOfLikes > 1 ? `${numberOfLikes} Likes` : `${numberOfLikes} Like`
        }}
      </div>
      <!-- END: NUMBER OF LIKES -->
    </div>
    <!-- END: POST LIST ITEM CONTENT -->

    <!-- BEGIN: POST LIST ITEM BOTTOM -->
    <div
      class="flex w-full items-center justify-start space-x-2 border-t px-6 py-2 text-xs"
    >
      <!-- BEGIN: LIKE ICON -->
      <div
        v-if="!isLiked"
        class="flex cursor-pointer items-center justify-center space-x-4"
        @click="onPostLike(uuid)"
      >
        <heart-icon
          class="fill-transparent stroke-gray-400 hover:fill-gray-400"
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
          class="fill-yellow-400 stroke-yellow-400 hover:fill-yellow-200 hover:stroke-yellow-200"
        ></heart-icon>
      </div>
      <!-- END: LIKE ICON -->
    </div>
    <!-- END: POST LIST ITEM BOTTOM -->
  </div>
</template>

<script>
import HeartIcon from './../assets/HeartIcon.vue';
import ProfilePicture from '../persons/ProfilePicture.vue';
import { MESSAGES } from '../../util/constants';
export default {
  name: 'PostListItem',
  props: [
    'uuid',
    'ownerName',
    'ownerId',
    'ownerUUID',
    'content',
    'numberOfLikes',
    'time',
    'postLikes',
  ],
  computed: {
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
