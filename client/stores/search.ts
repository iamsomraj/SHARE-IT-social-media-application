import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, SearchOperationResult } from '~/types/auth'
import { getApiEndpoints } from '~/utils/constants'

export const useSearchStore = defineStore('search', () => {
  // State
  const searchResults = ref<User[]>([])
  const loading = ref(false)
  const query = ref('')

  // Actions
  const searchPeople = async (
    searchQuery: string
  ): Promise<SearchOperationResult> => {
    loading.value = true
    query.value = searchQuery

    try {
      const authStore = useAuthStore()
      const token = authStore.token

      if (!token) {
        return {
          success: false,
          error: 'No authentication token',
          state: false,
        }
      }

      const endpoints = getApiEndpoints()
      const response = await $fetch<{
        data?: User[]
        state?: boolean
        message?: string
      }>(endpoints.SEARCH_PEOPLE, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          searchQuery,
        },
      })

      if (response && response.data && response.state) {
        searchResults.value = response.data
        return {
          success: true,
          data: response.data,
          state: true,
        }
      } else {
        searchResults.value = []
        return {
          success: false,
          error: response?.message || 'Search failed',
          state: false,
        }
      }
    } catch (error: unknown) {
      searchResults.value = []
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Search failed',
        state: false,
      }
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
    // State
    searchResults,
    loading,
    query,

    // Actions
    searchPeople,
    clearSearch,
  }
})
