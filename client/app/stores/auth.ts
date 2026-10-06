import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type {
  AuthenticatedUser,
  Post,
  User,
  UserOperationResult,
} from '~/types/auth'
import type { OperationResult } from '~/types/common'
import { apiRequest, toOperationResult } from '~/utils/api'
import { API_ROUTES, LOCAL_STORAGE_KEYS } from '~/utils/constants'

const createDefaultUser = (): User => ({
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

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>(createDefaultUser())
  const token = ref<string | null>(null)

  const isLoggedIn = computed(
    () => !!token.value && !!user.value.id && !!user.value.uuid
  )
  const uuid = computed(() => user.value.uuid)
  const posts = computed(() => user.value.person_posts)
  const followers = computed(() => user.value.person_followers)
  const followings = computed(() => user.value.person_followings)
  const postCount = computed(() => user.value.person_stats.post_count)
  const followerCount = computed(() => user.value.person_stats.follower_count)
  const followingCount = computed(() => user.value.person_stats.following_count)

  const setUser = (userData: User) => {
    user.value = userData
    if (import.meta.client) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(userData))
    }
  }

  const setToken = (tokenValue: string) => {
    token.value = tokenValue
    if (import.meta.client) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, tokenValue)
    }
  }

  const clear = () => {
    user.value = createDefaultUser()
    token.value = null
    if (import.meta.client) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN)
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER)
    }
  }

  const setSession = ({ token: userToken, ...userData }: AuthenticatedUser) => {
    setToken(userToken)
    setUser(userData)
  }

  const login = async (credentials: {
    email: string
    password: string
  }): Promise<OperationResult<AuthenticatedUser>> => {
    const result = await toOperationResult(
      apiRequest<AuthenticatedUser>(API_ROUTES.LOGIN, {
        method: 'POST',
        body: credentials,
      }),
      'Invalid credentials'
    )
    if (result.success && result.data?.token) {
      setSession(result.data)
    }
    return result
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
  }): Promise<OperationResult<AuthenticatedUser>> => {
    const result = await toOperationResult(
      apiRequest<AuthenticatedUser>(API_ROUTES.REGISTER, {
        method: 'POST',
        body: userData,
      }),
      'Registration failed'
    )
    if (result.success && result.data?.token) {
      setSession(result.data)
    }
    return result
  }

  /** Restores the session persisted in localStorage (client only). */
  const initializeAuth = () => {
    if (!import.meta.client || token.value) {
      return
    }

    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER)
    if (!storedToken || !storedUser) {
      return
    }

    try {
      token.value = storedToken
      user.value = JSON.parse(storedUser) as User
    } catch {
      clear()
    }
  }

  /** Re-validates the stored token against the API and refreshes the user. */
  const checkAuth = async (): Promise<UserOperationResult> => {
    initializeAuth()
    if (!token.value) {
      return { success: false, error: 'No token found' }
    }

    const result = await toOperationResult(
      apiRequest<User>(API_ROUTES.GET_USER_DATA, { token: token.value }),
      'Auth check failed'
    )
    if (result.success && result.data) {
      // This endpoint omits posts, so keep the ones already loaded.
      setUser({ ...user.value, ...result.data })
    } else {
      clear()
    }
    return result
  }

  const addPost = (post: Post) => {
    user.value = {
      ...user.value,
      person_posts: [...user.value.person_posts, post],
    }
  }

  const updatePost = (updatedPost: Post) => {
    user.value = {
      ...user.value,
      person_posts: user.value.person_posts.map(post =>
        post.id === updatedPost.id ? updatedPost : post
      ),
    }
  }

  const incrementPostCount = () => {
    user.value.person_stats.post_count += 1
  }

  const getSelfProfile = async ({
    uuid,
    token,
  }: {
    uuid: string
    token: string
  }): Promise<UserOperationResult> => {
    const result = await toOperationResult(
      apiRequest<User>(API_ROUTES.GET_USER_PROFILE(uuid), { token }),
      'Failed to get profile'
    )
    if (result.success && result.data) {
      setUser(result.data)
    } else {
      clear()
    }
    return result
  }

  return {
    user,
    token,
    isLoggedIn,
    uuid,
    posts,
    followers,
    followings,
    postCount,
    followerCount,
    followingCount,
    setUser,
    setToken,
    clear,
    login,
    register,
    initializeAuth,
    checkAuth,
    addPost,
    updatePost,
    incrementPostCount,
    getSelfProfile,
  }
})
