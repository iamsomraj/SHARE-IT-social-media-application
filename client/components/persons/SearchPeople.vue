<template>
  <div
    class="flex w-full flex-col items-start justify-center space-y-4 px-6 md:w-1/2"
  >
    <!-- BEGIN: SEARCH INPUT -->
    <div class="relative w-full">
      <input
        ref="searchInput"
        type="search"
        class="w-full rounded-xl bg-white p-2 pl-9 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-blue-400 dark:bg-slate-800"
        :value="search"
        @input="findPeople"
      />
      <search-icon
        class="absolute top-2.5 left-4 h-4 w-4 fill-slate-600 stroke-slate-600 dark:fill-slate-200 dark:stroke-slate-200"
      />
    </div>
    <!-- END: SEARCH INPUT -->

    <!-- BEGIN: SEARCH RESULTS -->
    <div v-if="loading" class="flex w-full items-center justify-center">
      <loader-icon class="h-6 w-6 animate-spin stroke-slate-400" />
    </div>
    <person-item
      v-else-if="people.length > 0"
      v-for="person in people"
      :key="person.id"
      :person="person"
    >
    </person-item>
    <div
      v-else-if="people.length === 0 && search.length > 3"
      class="flex w-full items-center justify-center"
    >
      <div class="text-center text-xl font-bold text-slate-600">
        No results found.
      </div>
    </div>
    <!-- END: SEARCH RESULTS -->
  </div>
</template>

<script>
import { MESSAGES } from '../../util/constants';
import LoaderIcon from '../assets/LoaderIcon.vue';
import SearchIcon from '../assets/SearchIcon.vue';
import PersonItem from './PersonItem.vue';

export default {
  name: 'SearchPeople',
  data() {
    return {
      search: '',
      people: [],
      loading: false,
    };
  },
  mounted() {
    this.$refs.searchInput.focus();
  },
  computed: {
    token() {
      return this.$store.getters['auth/token'];
    },
  },
  methods: {
    async findPeople(event) {
      this.search = event.target.value;
      if (this.search.length < 4) {
        this.people = [];
        return;
      }

      this.searchPeople(this.search);
    },
    async searchPeople(value) {
      this.loading = true;
      const { data, state } = await this.$store.dispatch('auth/search', value);
      this.loading = false;
      if (state) {
        this.people = data;
      } else {
        this.$store.dispatch('toast/error', MESSAGES.SEARCH_FAILURE);
        this.search = '';
        this.people = [];
      }
    },
  },
  components: { LoaderIcon, PersonItem, SearchIcon },
};
</script>
