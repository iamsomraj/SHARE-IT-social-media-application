import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Post, PostOperationResult } from '~/types/auth'
import { apiRequest, toOperationResult } from '~/utils/api'
import { API_ROUTES } from '~/utils/constants'

interface PostActionPayload {
  postUUID: string
  token: string
}

export const usePostStore = defineStore('post', () => {
  const post = ref<Post | null>(null)
  const loading = ref(false)

  /** Applies an updated post to the open post view and the feed. */
  const syncUpdatedPost = (updatedPost: Post) => {
    if (post.value?.id === updatedPost.id) {
      post.value = updatedPost
    }
    useFeedStore().updatePostInFeed(updatedPost)
  }

  const runPostAction = async (
    path: string,
    token: string,
    fallbackError: string
  ): Promise<PostOperationResult> => {
    const result = await toOperationResult(
      apiRequest<Post>(path, { method: 'POST', token }),
      fallbackError
    )
    if (result.success && result.data) {
      syncUpdatedPost(result.data)
    }
    return result
  }

  const fetchPost = async ({
    uuid,
    token,
  }: {
    uuid: string
    token: string
  }): Promise<PostOperationResult> => {
    loading.value = true
    try {
      const result = await toOperationResult(
        apiRequest<Post>(API_ROUTES.FETCH_POST(uuid), { token }),
        'Failed to fetch post'
      )
      post.value = result.success && result.data ? result.data : null
      return result
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
    if (!token) {
      return { success: false, error: 'No authentication token' }
    }

    const result = await toOperationResult(
      apiRequest<Post>(API_ROUTES.CREATE_POST, {
        method: 'POST',
        body: { content },
        token,
      }),
      'Post creation failed'
    )
    if (result.success && result.data) {
      const authStore = useAuthStore()
      authStore.addPost(result.data)
      authStore.incrementPostCount()
    }
    return result
  }

  const likePost = ({ postUUID, token }: PostActionPayload) =>
    runPostAction(API_ROUTES.ADD_LIKE(postUUID), token, 'Failed to like post')

  const unlikePost = ({ postUUID, token }: PostActionPayload) =>
    runPostAction(
      API_ROUTES.REMOVE_LIKE(postUUID),
      token,
      'Failed to unlike post'
    )

  const addStory = ({ postUUID, token }: PostActionPayload) =>
    runPostAction(API_ROUTES.ADD_STORY(postUUID), token, 'Failed to add story')

  const removeStory = ({ postUUID, token }: PostActionPayload) =>
    runPostAction(
      API_ROUTES.REMOVE_STORY(postUUID),
      token,
      'Failed to remove story'
    )

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
