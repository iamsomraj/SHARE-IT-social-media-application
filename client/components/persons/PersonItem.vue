<template>
  <div
    class="flex justify-around items-center m-4 py-6 w-full md:w-1/2 border rounded"
  >
    <div>
      <div
        class="text-purple-400 text-xl font-extrabold cursor-pointer"
        @click="$router.push(`/profile/${person.uuid}`)"
      >
        @{{ person.name }}
      </div>
      <div class="text-slate-400 text-sm">{{ person.email }}</div>
    </div>
    <button
      class="px-4 py-3 rounded-lg cursor-pointer shadow bg-pink-400 text-pink-100 font-bold"
      @click="$router.push(`/profile/${person.uuid}`)"
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
