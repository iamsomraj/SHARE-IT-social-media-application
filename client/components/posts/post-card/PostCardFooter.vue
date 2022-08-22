<template>
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
</template>

<script>
import HeartIcon from './../../assets/HeartIcon.vue';
export default {
  name: 'PostCardFooter',
  props: {
    uuid: {
      type: String,
      required: true,
    },
    isLiked: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onPostLike(uuid) {
      this.$emit('on-post-like', uuid);
    },
    onPostUnlike(uuid) {
      this.$emit('on-post-unlike', uuid);
    },
  },
  components: {
    HeartIcon,
  },
  emits: ['onPostLike', 'onPostUnlike'],
};
</script>
