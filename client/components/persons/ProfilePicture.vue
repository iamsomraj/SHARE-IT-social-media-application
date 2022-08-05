<template>
  <div
    class="flex rotate-45 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-blue-400 text-center font-extrabold capitalize text-white shadow-inner transition-all duration-300 hover:scale-110"
    @click="$router.push(`/profile/${uuid}`)"
  >
    {{ initialLetterOfName }}
  </div>
</template>

<script>
export default {
  name: 'ProfilePicture',
  props: ['uuid', 'name'],
  computed: {
    initialLetterOfName() {
      return this.name.charAt(0);
    },
  },
};
</script>
