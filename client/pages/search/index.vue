<template>
  <div
    class="flex min-h-screen w-screen items-start justify-center pt-4 pb-16 dark:bg-slate-800 md:py-6"
  >
    <search-people />
  </div>
</template>

<script>
import SearchPeople from '../../components/persons/SearchPeople.vue';
export default {
  name: 'SearchPage',
  middleware: 'authenticated',
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
    token() {
      return this.$store.getters['auth/token'];
    },
  },
  components: { SearchPeople },
};
</script>
