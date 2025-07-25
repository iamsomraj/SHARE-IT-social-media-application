import { defineStore } from 'pinia'
import type { Post, PostOperationResult } from '~/types/auth'
import type { ApiResponse } from '~/types/common'
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
  }): Promise<PostOperationResult> => {
    try {
      if (!token) {
        return {
          success: false,
          error: 'No authentication token',
          state: false,
        }
      }

      const endpoints = getApiEndpoints()
      const responseData = await $fetch<{
        data: Post
        state: boolean
        message: string
      }>(endpoints.CREATE_POST, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { content },
      })

      if (responseData.state && responseData.data) {
        const authStore = useAuthStore()
        authStore.addPost(responseData.data)
        authStore.incrementPostCount()
      }

      return {
        success: responseData.state,
        data: responseData.data,
        state: responseData.state,
      }
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
  }): Promise<PostOperationResult> => {
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
        if (post.value && post.value.id === responseData.data.id) {
          post.value = responseData.data
        }

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
  }): Promise<PostOperationResult> => {
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
        if (post.value && post.value.id === responseData.data.id) {
          post.value = responseData.data
        }

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
  }): Promise<PostOperationResult> => {
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
        if (post.value && post.value.id === responseData.data.id) {
          post.value = responseData.data
        }

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
  }): Promise<PostOperationResult> => {
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
        if (post.value && post.value.id === responseData.data.id) {
          post.value = responseData.data
        }

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
        error instanceof Error ? error.message : 'Failed to remove story'
      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  return {
    post,
    loading,

    fetchPost,
    createPost,
    likePost,
    unlikePost,
    addStory,
    removeStory,
  }
})
