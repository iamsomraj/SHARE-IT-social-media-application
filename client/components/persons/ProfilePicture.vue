<template>
  <div
    class="flex rotate-45 cursor-pointer items-center justify-center overflow-hidden rounded-full border text-center font-extrabold capitalize text-white shadow-inner transition-all duration-300 hover:scale-110 dark:border-none"
    @click="$router.push(`/profile/${uuid}`)"
    :class="{
      'bg-blue-400': isSelf,
      'bg-yellow-400': !isSelf,
    }"
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
    isSelf() {
      return this.$store.getters['auth/uuid'] === this.uuid;
    },
  },
};
</script>
