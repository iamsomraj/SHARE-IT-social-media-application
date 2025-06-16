import { defineStore } from 'pinia'
import type { Post, ApiResponse } from '~/types/auth'
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

  return {
    // State
    posts,
    stories,
    loading,

    // Actions
    fetchPosts,
    fetchStories,
    updatePostInFeed,
    addPostToFeed,
    removePostFromFeed,
  }
})
