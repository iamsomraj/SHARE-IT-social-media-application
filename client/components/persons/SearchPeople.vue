<template>
  <div
    class="flex w-full flex-col items-start justify-center space-y-4 px-6 md:w-1/2"
  >
    <div class="relative w-full">
      <input
        ref="searchInput"
        type="search"
        class="w-full rounded-xl border-2 p-2 pl-10 text-sm text-slate-600 placeholder:text-slate-400 focus:border-none focus:outline-blue-400 dark:border-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-2 dark:focus:border-blue-400 dark:focus:outline-blue-400"
        :value="search"
        @input="findPeople"
      />
      <search-icon
        class="absolute left-4 top-2.5 h-4 w-4 fill-slate-600 stroke-slate-600 dark:fill-slate-200 dark:stroke-slate-200"
      />
    </div>

    <div v-if="loading" class="flex w-full items-center justify-center">
      <loader-icon class="h-6 w-6 animate-spin stroke-slate-400" />
    </div>
    <person-item
      v-else-if="people.length > 0"
      v-for="person in people"
      :key="person.id"
      :person="person"
    />
    <div
      v-else-if="people.length === 0 && search.length > 3"
      class="flex w-full items-center justify-center"
    >
      <div
        class="text-center text-xl font-bold text-slate-600 dark:text-slate-200"
      >
        No results found.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { MESSAGES } from '~/utils/constants'
  import LoaderIcon from '~/components/assets/LoaderIcon.vue'
  import SearchIcon from '~/components/assets/SearchIcon.vue'
  import PersonItem from '~/components/persons/PersonItem.vue'
  import { useToastStore } from '~/stores/toast'
  import { useSearchStore } from '~/stores/search'

  const toastStore = useToastStore()
  const searchStore = useSearchStore()

  const search = ref('')
  const searchInput = ref<HTMLInputElement | null>(null)

  onMounted(() => {
    searchInput.value?.focus()
  })

  const people = computed(() => searchStore.searchResults)
  const loading = computed(() => searchStore.loading)

  const findPeople = async (event: Event) => {
    const target = event.target as HTMLInputElement
    search.value = target.value

    if (search.value.length < 4) {
      searchStore.clearSearch()
      return
    }

    await performSearch(search.value)
  }

  const performSearch = async (value: string) => {
    const result = await searchStore.searchPeople(value)

    if (!result.success) {
      toastStore.error(result.error || MESSAGES.SEARCH_FAILURE)
      search.value = ''
    }
  }
</script>
