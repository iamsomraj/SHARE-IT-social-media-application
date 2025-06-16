import { defineStore } from 'pinia'
import type { Post, ApiResponse } from '~/types/auth'
import { getApiEndpoints } from '~/utils/constants'

export const usePostStore = defineStore('post', () => {
  const post = ref<Post | null>(null)
  const loading = ref(false)

  const fetchPost = async (payload: {
    uuid: string
    token: string
  }): Promise<ApiResponse<Post>> => {
    try {
      loading.value = true
      const endpoints = getApiEndpoints()
      const responseData = await $fetch<{
        data: Post
        state: boolean
        message: string
      }>(`${endpoints.FETCH_POST}/${payload.uuid}`, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
          'Content-Type': 'application/json',
        },
      })

      if (responseData.state) {
        post.value = responseData.data
      } else {
        post.value = null
      }

      return {
        success: responseData.state,
        data: responseData.data,
        message: responseData.message,
      }
    } catch (error: unknown) {
      post.value = null
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch post'
      return {
        success: false,
        error: errorMessage,
      }
    } finally {
      loading.value = false
    }
  }

  const createPost = async ({
    content,
    token,
  }: {
    content: string
    token: string
  }): Promise<ApiResponse<unknown>> => {
    try {
      if (!token) {
        return {
          success: false,
          error: 'No authentication token',
          state: false,
        }
      }

      const endpoints = getApiEndpoints()
      const data = await $fetch(endpoints.CREATE_POST, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { content },
      })

      return { success: true, data, state: true }
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Post creation failed',
        state: false,
      }
    }
  }

  const likePost = async (payload: {
    postUUID: string
    token: string
  }): Promise<ApiResponse<Post>> => {
    try {
      const endpoints = getApiEndpoints()
      const responseData = await $fetch<{
        data: Post
        state: boolean
        message: string
      }>(`${endpoints.ADD_LIKE}/${payload.postUUID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${payload.token}`,
          'Content-Type': 'application/json',
        },
      })

      if (responseData.state) {
        // Update current post if it's the same
        if (post.value && post.value.id === responseData.data.id) {
          post.value = responseData.data
        }

        // Update feed post if feed store is available
        const feedStore = useFeedStore()
        feedStore.updatePostInFeed(responseData.data)
      }

      return {
        success: responseData.state,
        data: responseData.data,
        message: responseData.message,
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to like post'
      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  const unlikePost = async (payload: {
    postUUID: string
    token: string
  }): Promise<ApiResponse<Post>> => {
    try {
      const endpoints = getApiEndpoints()
      const responseData = await $fetch<{
        data: Post
        state: boolean
        message: string
      }>(`${endpoints.REMOVE_LIKE}/${payload.postUUID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${payload.token}`,
          'Content-Type': 'application/json',
        },
      })

      if (responseData.state) {
        // Update current post if it's the same
        if (post.value && post.value.id === responseData.data.id) {
          post.value = responseData.data
        }

        // Update feed post if feed store is available
        const feedStore = useFeedStore()
        feedStore.updatePostInFeed(responseData.data)
      }

      return {
        success: responseData.state,
        data: responseData.data,
        message: responseData.message,
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to unlike post'
      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  const addStory = async (payload: {
    postUUID: string
    token: string
  }): Promise<ApiResponse<Post>> => {
    try {
      const endpoints = getApiEndpoints()
      const responseData = await $fetch<{
        data: Post
        state: boolean
        message: string
      }>(`${endpoints.ADD_STORY}/${payload.postUUID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${payload.token}`,
          'Content-Type': 'application/json',
        },
      })

      if (responseData.state) {
        post.value = responseData.data
      }

      return {
        success: responseData.state,
        data: responseData.data,
        message: responseData.message,
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to add story'
      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  const removeStory = async (payload: {
    postUUID: string
    token: string
  }): Promise<ApiResponse<Post>> => {
    try {
      const endpoints = getApiEndpoints()
      const responseData = await $fetch<{
        data: Post
        state: boolean
        message: string
      }>(`${endpoints.REMOVE_STORY}/${payload.postUUID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${payload.token}`,
          'Content-Type': 'application/json',
        },
      })

      if (responseData.state) {
        post.value = responseData.data
      }

      return {
        success: responseData.state,
        data: responseData.data,
        message: responseData.message,
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to remove story'
      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  return {
    // State
    post: readonly(post),
    loading: readonly(loading),

    // Actions
    fetchPost,
    createPost,
    likePost,
    unlikePost,
    addStory,
    removeStory,
  }
})
