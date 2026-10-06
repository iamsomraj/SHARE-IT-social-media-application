import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SearchOperationResult, User } from '~/types/auth'
import { apiRequest, toOperationResult } from '~/utils/api'
import { API_ROUTES } from '~/utils/constants'

export const useSearchStore = defineStore('search', () => {
  const searchResults = ref<User[]>([])
  const loading = ref(false)
  const query = ref('')

  const searchPeople = async (
    searchQuery: string
  ): Promise<SearchOperationResult> => {
    loading.value = true
    query.value = searchQuery

    try {
      const { token } = useAuthStore()
      if (!token) {
        return { success: false, error: 'No authentication token' }
      }

      const result = await toOperationResult(
        apiRequest<User[]>(API_ROUTES.SEARCH_PEOPLE, {
          method: 'POST',
          body: { searchQuery },
          token,
        }),
        'Search failed'
      )
      searchResults.value = result.success && result.data ? result.data : []
      return result
    } finally {
      loading.value = false
    }
  }

  const clearSearch = () => {
    searchResults.value = []
    query.value = ''
    loading.value = false
  }

  return {
    searchResults,
    loading,
    query,

    searchPeople,
    clearSearch,
  }
})
