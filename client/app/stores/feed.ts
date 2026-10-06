import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Post, PostOperationResult } from '~/types/auth'
import type { OperationResult } from '~/types/common'
import { apiRequest, toOperationResult } from '~/utils/api'
import { API_ROUTES } from '~/utils/constants'

export const useFeedStore = defineStore('feed', () => {
  const posts = ref<Post[]>([])
  const stories = ref<Post[]>([])
  const loading = ref(false)

  const fetchPosts = async (
    token: string
  ): Promise<OperationResult<Post[]>> => {
    loading.value = true
    try {
      const result = await toOperationResult(
        apiRequest<Post[]>(API_ROUTES.GET_POST_FEED, { token }),
        'Failed to fetch posts'
      )
      if (result.success && result.data) {
        posts.value = result.data
      }
      return result
    } finally {
      loading.value = false
    }
  }

  const fetchStories = async (
    token: string
  ): Promise<OperationResult<Post[]>> => {
    loading.value = true
    try {
      const result = await toOperationResult(
        apiRequest<Post[]>(API_ROUTES.GET_STORY_POSTS, { token }),
        'Failed to fetch stories'
      )
      if (result.success && result.data) {
        stories.value = result.data
      }
      return result
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

  /** Applies an updated post to the feed and to the user's own posts. */
  const syncUpdatedPost = (updatedPost: Post) => {
    updatePostInFeed(updatedPost)
    const authStore = useAuthStore()
    if (authStore.posts.some(post => post.id === updatedPost.id)) {
      authStore.updatePost(updatedPost)
    }
  }

  const likePost = async ({
    postUUID,
    token,
  }: {
    postUUID: string
    token: string
  }): Promise<PostOperationResult> => {
    const result = await toOperationResult(
      apiRequest<Post>(API_ROUTES.ADD_LIKE(postUUID), {
        method: 'POST',
        token,
      }),
      'Failed to like post'
    )
    if (result.success && result.data) {
      syncUpdatedPost(result.data)
    }
    return result
  }

  const unlikePost = async ({
    postUUID,
    token,
  }: {
    postUUID: string
    token: string
  }): Promise<PostOperationResult> => {
    const result = await toOperationResult(
      apiRequest<Post>(API_ROUTES.REMOVE_LIKE(postUUID), {
        method: 'POST',
        token,
      }),
      'Failed to unlike post'
    )
    if (result.success && result.data) {
      syncUpdatedPost(result.data)
    }
    return result
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
