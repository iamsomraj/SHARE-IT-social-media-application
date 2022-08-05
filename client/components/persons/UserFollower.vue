<template>
  <div class="flex justify-center items-center">
    <div class="mb-4 mx-4 space-y-4 w-full md:w-1/2 border">
      <button
        v-if="!doesUserFollow"
        class="bg-green-400 w-full p-2 cursor-pointer text-green-50 font-bold rounded"
        @click="onUserFollow"
      >
        Follow
      </button>
      <button
        v-else
        class="bg-purple-400 w-full p-2 cursor-not-allowed text-green-50 font-bold rounded"
        disabled
      >
        Followed
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserFollower',
  props: ['doesUserFollow'],
  methods: {
    onUserFollow() {
      this.$emit('onUserFollow');
    },
  },
};
</script>

<style lang="scss" scoped></style>
