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
        <div @click="$router.push(`/profile/${ownerUUID}`)">
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
    <div class="px-6">
      {{ content }}
    </div>
    <!-- END: POST LIST ITEM CONTENT -->

    <!-- BEGIN: POST LIST ITEM BOTTOM -->
    <div
      class="flex w-full items-center justify-start space-x-2 border-t px-6 py-2 text-xs"
    >
      <!-- BEGIN: NUMBER OF LIKES AND LIKE ICON -->
      <div
        class="flex cursor-pointer items-center justify-center space-x-4"
        @click="onPostLike(uuid)"
      >
        <!-- BEGIN: NUMBER OF LIKES -->
        <div>{{ numberOfLikes }}</div>
        <!-- END: NUMBER OF LIKES -->

        <!-- BEGIN: LIKE ICON -->
        <heart-icon class="text-gray-400"></heart-icon>
        <!-- END: LIKE ICON -->
      </div>
      <!-- END: NUMBER OF LIKES AND LIKE ICON -->
    </div>
    <!-- END: POST LIST ITEM BOTTOM -->
  </div>
</template>

<script>
import HeartIcon from './../assets/HeartIcon.vue';
import ProfilePicture from '../persons/ProfilePicture.vue';
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
  ],
  methods: {
    onPostLike(uuid) {
      this.$emit('onPostLike', uuid);
    },
  },
  components: { ProfilePicture, HeartIcon },
};
</script>

<style lang="scss" scoped></style>
