<template>
  <div class="mt-4 mb-16 w-full md:my-6 flex justify-center items-center">
    <search-people />
  </div>
</template>

<script>
import { getPeople } from '../../helpers';
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
