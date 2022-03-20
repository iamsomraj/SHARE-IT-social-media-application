<template>
  <div class="flex justify-center items-center">
    <div class="mb-4 mx-4 space-y-4 w-full md:w-1/3 border">
      <button
        class="bg-green-400 w-full p-2 text-green-50 font-bold rounded"
        @click="onUserFollow"
      >
        Follow
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserFollower',
  methods: {
    onUserFollow() {
      this.$emit('onUserFollow');
    },
  },
};
</script>

<style lang="scss" scoped></style>
