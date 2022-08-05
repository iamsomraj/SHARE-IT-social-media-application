<template>
  <div class="flex items-center justify-center">
    <form @submit="onPostCreate" class="m-4 w-full space-y-4 md:w-1/2">
      <div>
        <input
          placeholder="Speak your mind"
          v-model="postInput"
          class="w-full rounded border-2 border-gray-200 px-4 py-3 outline-none"
        />
      </div>
      <button class="w-full rounded bg-blue-400 p-2 font-bold text-blue-50">
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
      this.postInput = '';
    },
  },
};
</script>

<style scoped></style>
