import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, ApiResponse, AuthResponse, Post } from '~/types/auth'
import { getApiEndpoints } from '~/utils/constants'

const defaultUser: User = {
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
  },
  person_posts: [],
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User>(defaultUser)
  const token = ref<string | null>(null)

  // Getters
  const isLoggedIn = computed(
    () => !!token.value && !!user.value?.id && !!user.value?.uuid
  )

  const uuid = computed(() => user.value.uuid)

  const posts = computed(() => user.value.person_posts)
  const followers = computed(() => user.value.person_followers)
  const followings = computed(() => user.value.person_followings)
  const postCount = computed(() => user.value.person_stats.post_count)
  const followerCount = computed(() => user.value.person_stats.follower_count)
  const followingCount = computed(() => user.value.person_stats.following_count)

  // Actions
  const setUser = (userData: User) => {
    user.value = userData
    // Store in localStorage
    if (process.client) {
      localStorage.setItem('share-it-user', JSON.stringify(userData))
    }
  }

  const setToken = (tokenValue: string) => {
    token.value = tokenValue
    // Store in localStorage
    if (process.client) {
      localStorage.setItem('share-it-token', tokenValue)
    }
  }

  const clear = () => {
    user.value = defaultUser
    token.value = null
    // Clear localStorage
    if (process.client) {
      localStorage.removeItem('share-it-token')
      localStorage.removeItem('share-it-user')
    }
  }

  const login = async (credentials: {
    email: string
    password: string
  }): Promise<ApiResponse<AuthResponse>> => {
    try {
      const endpoints = getApiEndpoints()
      const response = await $fetch<AuthResponse>(endpoints.LOGIN, {
        method: 'POST',
        body: credentials,
      })

      if (response?.state && response?.data && response?.data.token) {
        const { token: userToken, ...userData } = response.data
        setToken(userToken)
        setUser(userData)

        return { success: true, data: response, state: true }
      }

      return { success: false, error: 'Invalid response format' }
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }
    }
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
  }): Promise<ApiResponse<AuthResponse>> => {
    try {
      const endpoints = getApiEndpoints()
      const response = await $fetch<AuthResponse>(endpoints.REGISTER, {
        method: 'POST',
        body: userData,
      })

      if (response?.state && response?.data && response?.data.token) {
        const { token: userToken, ...userDataWithoutToken } = response.data
        setToken(userToken)
        setUser(userDataWithoutToken)

        return { success: true, data: response, state: true }
      }

      return { success: false, error: 'Invalid response format' }
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      }
    }
  }

  const initializeAuth = () => {
    if (process.client) {
      const storedToken = localStorage.getItem('share-it-token')
      const storedUser = localStorage.getItem('share-it-user')

      if (storedToken && storedUser) {
        try {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
        } catch {
          // Failed to parse stored user data
          clear()
        }
      }
    }
  }

  const checkAuth = async () => {
    try {
      if (!token.value) {
        initializeAuth()
        return { success: false, error: 'No token found' }
      }

      const endpoints = getApiEndpoints()
      const response = await $fetch<{ user: User }>(endpoints.GET_USER_DATA, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      if (response?.user) {
        setUser(response.user)
        return { success: true, data: response }
      }

      return { success: false, error: 'Invalid user data' }
    } catch (error: unknown) {
      clear()
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Auth check failed',
      }
    }
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
  }): Promise<ApiResponse<User>> => {
    try {
      const endpoints = getApiEndpoints()
      const responseData = await $fetch<{
        data: User
        state: boolean
        message: string
      }>(`${endpoints.GET_USER_PROFILE}/${uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (responseData.state && responseData.data) {
        setUser(responseData.data)
      } else {
        clear()
      }

      return {
        success: responseData.state,
        data: responseData.data,
        message: responseData.message,
      }
    } catch (error: unknown) {
      clear()
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get profile',
      }
    }
  }

  return {
    // State
    user,
    token,
    // Getters
    isLoggedIn,
    uuid,
    posts,
    followers,
    followings,
    postCount,
    followerCount,
    followingCount,
    // Actions
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
