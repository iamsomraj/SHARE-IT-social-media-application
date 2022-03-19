<template>
  <div class="flex justify-center items-center">
    <form @submit="onPostCreate" class="m-4 space-y-4 w-full md:w-1/2">
      <div>
        <input
          placeholder="Speak your mind"
          v-model="postInput"
          class="px-4 py-3 w-full outline-none border-2 border-gray-200 rounded"
        />
      </div>
      <button class="bg-blue-400 w-full p-2 text-blue-50 font-bold rounded">
        Create
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PostCreator',
  data() {
    return {
      postInput: '',
    };
  },
  methods: {
    onPostCreate(e) {
      e.preventDefault();
      this.$emit('onPostCreate', this.postInput);
    },
  },
};
</script>

<style scoped></style>
