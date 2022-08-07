<template>
  <div
    class="flex w-full flex-col items-start justify-center space-y-4 md:w-1/2"
  >
    <!-- BEGIN: SEARCH INPUT -->
    <div class="w-full px-6">
      <input
        type="text"
        class="w-full rounded-xl bg-slate-100 px-4 py-4 text-xl text-slate-600 placeholder:text-slate-400 focus:outline-none"
        placeholder="Search for people.."
        :value="search"
        @input="findPeople"
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
    <!-- END: SEARCH RESULTS -->
  </div>
</template>

<script>
import axios from 'axios';
import { getHeaders, MESSAGES, SEARCH_PEOPLE_URL } from '../../util/constants';
import LoaderIcon from '../assets/LoaderIcon.vue';
import PersonItem from './PersonItem.vue';
import { debounce } from './../../util/helpers.js';

export default {
  name: 'SearchPeople',
  data() {
    return {
      search: '',
      people: [],
      loading: false,
    };
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

      debounce(this.searchPeople(this.search), 2000);
    },
    async searchPeople(value) {
      try {
        this.loading = true;
        const { data: responseData } = await axios.post(
          SEARCH_PEOPLE_URL,
          {
            searchQuery: value,
          },
          {
            ...getHeaders(this.token),
          }
        );
        this.loading = false;
        const { data, state } = responseData;
        if (state) {
          this.people = data;
        } else {
          this.$store.dispatch('toast/error', MESSAGES.SEARCH_FAILURE);
          this.search = '';
          this.people = [];
        }
      } catch (error) {
        this.$store.dispatch('toast/error', MESSAGES.SEARCH_FAILURE);
        this.search = '';
        this.people = [];
      }
    },
  },
  components: { LoaderIcon, PersonItem },
};
</script>
