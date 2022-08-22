<template>
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
</template>

<script>
import ProfilePicture from '../../persons/ProfilePicture.vue';
export default {
  name: 'PostCardHeader',
  props: {
    ownerUUID: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  components: {
    ProfilePicture,
  },
};
</script>
