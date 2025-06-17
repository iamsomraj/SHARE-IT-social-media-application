import { defineStore } from 'pinia'
import type { Post } from '~/types/auth'
import type { ApiResponse } from '~/types/common'
import { getApiEndpoints } from '~/utils/constants'

export const useFeedStore = defineStore('feed', () => {
  const posts = ref<Post[]>([])
  const stories = ref<Post[]>([])
  const loading = ref(false)

  const fetchPosts = async (token: string): Promise<ApiResponse<Post[]>> => {
    try {
      loading.value = true
      const endpoints = getApiEndpoints()
      const responseData = await $fetch<{
        data: Post[]
        state: boolean
        message: string
      }>(endpoints.GET_POST_FEED, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (responseData.state) {
        posts.value = responseData.data
      }

      return {
        success: responseData.state,
        data: responseData.data,
        message: responseData.message,
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch posts'
      return {
        success: false,
        error: errorMessage,
      }
    } finally {
      loading.value = false
    }
  }

  const fetchStories = async (token: string): Promise<ApiResponse<Post[]>> => {
    try {
      loading.value = true
      const endpoints = getApiEndpoints()
      const responseData = await $fetch<{
        data: Post[]
        state: boolean
        message: string
      }>(endpoints.GET_STORY_POSTS, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (responseData.state) {
        stories.value = responseData.data
      }

      return {
        success: responseData.state,
        data: responseData.data,
        message: responseData.message,
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch stories'
      return {
        success: false,
        error: errorMessage,
      }
    } finally {
      loading.value = false
    }
  }

  const updatePostInFeed = (updatedPost: Post) => {
    const postIndex = posts.value.findIndex(post => post.id === updatedPost.id)
    if (postIndex !== -1) {
      posts.value[postIndex] = updatedPost
    }
  }

  const addPostToFeed = (newPost: Post) => {
    posts.value.unshift(newPost)
  }

  const removePostFromFeed = (postId: number | string) => {
    posts.value = posts.value.filter(
      post => post.id.toString() !== postId.toString()
    )
  }

  const likePost = async ({
    postUUID,
    token,
  }: {
    postUUID: string
    token: string
  }): Promise<ApiResponse<Post>> => {
    try {
      const endpoints = getApiEndpoints()
      const responseData = await $fetch<{
        data: Post
        state: boolean
        message: string
      }>(`${endpoints.ADD_LIKE}/${postUUID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (responseData.state) {
        updatePostInFeed(responseData.data)

        const authStore = useAuthStore()
        if (authStore.posts.some(post => post.id === responseData.data.id)) {
          authStore.updatePost(responseData.data)
        }
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

  const unlikePost = async ({
    postUUID,
    token,
  }: {
    postUUID: string
    token: string
  }): Promise<ApiResponse<Post>> => {
    try {
      const endpoints = getApiEndpoints()
      const responseData = await $fetch<{
        data: Post
        state: boolean
        message: string
      }>(`${endpoints.REMOVE_LIKE}/${postUUID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (responseData.state) {
        updatePostInFeed(responseData.data)

        const authStore = useAuthStore()
        if (authStore.posts.some(post => post.id === responseData.data.id)) {
          authStore.updatePost(responseData.data)
        }
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

  return {
    posts,
    stories,
    loading,

    fetchPosts,
    fetchStories,
    updatePostInFeed,
    addPostToFeed,
    removePostFromFeed,
    likePost,
    unlikePost,
  }
})
