import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type {
  Post,
  PostOperationResult,
  User,
  UserOperationResult,
} from '~/types/auth'
import { apiRequest, toOperationResult } from '~/utils/api'
import { API_ROUTES } from '~/utils/constants'

interface UuidPayload {
  uuid: string
  token: string
}

interface PostActionPayload {
  postUUID: string
  token: string
}

const createDefaultProfile = (): User => ({
  id: 0,
  uuid: '',
  name: '',
  email: '',
  created_at: '',
  updated_at: '',
  is_deleted: false,
  person_followers: [],
  person_followings: [],
  person_stats: {
    id: 0,
    person_id: 0,
    post_count: 0,
    follower_count: 0,
    following_count: 0,
    created_at: '',
    updated_at: '',
  },
  person_posts: [],
})

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<User>(createDefaultProfile())

  const posts = computed(() => profile.value.person_posts)

  const setProfile = (newProfile: User) => {
    profile.value = newProfile
  }

  const clearProfile = () => {
    profile.value = createDefaultProfile()
  }

  const updatePost = (updatedPost: Post) => {
    profile.value.person_posts = profile.value.person_posts.map(postItem =>
      postItem.id === updatedPost.id ? { ...updatedPost } : postItem
    )
  }

  const fetchProfile = async (
    { uuid, token }: UuidPayload,
    fallbackError: string
  ): Promise<UserOperationResult> => {
    const result = await toOperationResult(
      apiRequest<User>(API_ROUTES.GET_USER_PROFILE(uuid), { token }),
      fallbackError
    )
    setProfile(
      result.success && result.data ? result.data : createDefaultProfile()
    )
    return result
  }

  const getUserProfile = (payload: UuidPayload) =>
    fetchProfile(payload, 'Failed to fetch profile')

  const getSelfProfile = (payload: UuidPayload) =>
    fetchProfile(payload, 'Failed to get profile')

  /** Follow/unfollow return the current user's refreshed details. */
  const runFollowAction = async (
    path: string,
    token: string,
    fallbackError: string
  ): Promise<UserOperationResult> => {
    const result = await toOperationResult(
      apiRequest<User>(path, { method: 'POST', token }),
      fallbackError
    )
    if (result.success && result.data) {
      const authStore = useAuthStore()
      // The response omits posts, so keep the ones already loaded.
      authStore.setUser({ ...authStore.user, ...result.data })
    }
    return result
  }

  const follow = ({ uuid, token }: UuidPayload) =>
    runFollowAction(API_ROUTES.FOLLOW(uuid), token, 'Follow failed')

  const unfollow = ({ uuid, token }: UuidPayload) =>
    runFollowAction(API_ROUTES.UNFOLLOW(uuid), token, 'Unfollow failed')

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
      updatePost(result.data)
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

  return {
    profile,

    posts,

    getUserProfile,
    getSelfProfile,
    follow,
    unfollow,
    likePost,
    unlikePost,
    setProfile,
    clearProfile,
  }
})
