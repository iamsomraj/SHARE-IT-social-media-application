<template>
  <div
    class="flex justify-around items-center m-4 py-6 w-full md:w-2/3 border rounded"
  >
    <div>
      <div
        class="text-purple-500 text-xl font-extrabold cursor-pointer"
        @click="$router.push(`/profile/${person.id}`)"
      >
        @{{ person.name }}
      </div>
      <div class="text-gray-500 text-sm">{{ person.email }}</div>
    </div>
    <button
      class="px-4 py-3 rounded-lg cursor-pointer shadow bg-pink-400 text-pink-100 font-bold"
      @click="$router.push(`/profile/${person.id}`)"
    >
      Visit Profile
    </button>
  </div>
</template>

<script>
export default {
  name: 'PersonItem',
  props: ['person'],
};
</script>

<style lang="scss" scoped></style>
