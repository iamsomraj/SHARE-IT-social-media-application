import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, Post, ApiResponse } from '~/types/auth'
import { getApiEndpoints } from '~/utils/constants'

export interface Profile extends User {}

const defaultProfile: Profile = {
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

export const useProfileStore = defineStore('profile', () => {
  // State
  const profile = ref<Profile>(defaultProfile)

  // Getters
  const posts = computed(() => profile.value.person_posts)

  // Actions
  const setProfile = (newProfile: Profile) => {
    profile.value = newProfile
  }

  const clearProfile = () => {
    profile.value = defaultProfile
  }

  const updatePost = (updatedPost: Post) => {
    profile.value.person_posts = profile.value.person_posts.map(postItem => {
      if (Number(postItem?.id) === Number(updatedPost?.id)) {
        return { ...updatedPost }
      } else {
        return postItem
      }
    })
  }

  const getUserProfile = async ({
    uuid,
    token,
  }: {
    uuid: string
    token: string
  }): Promise<ApiResponse<Profile>> => {
    try {
      const endpoints = getApiEndpoints()
      const responseData = await $fetch<{
        data: Profile
        state: boolean
        message: string
      }>(`${endpoints.GET_USER_PROFILE}/${uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (responseData.state) {
        setProfile(responseData.data)
        return {
          success: true,
          data: responseData.data,
          message: responseData.message,
        }
      } else {
        setProfile(defaultProfile)
        return {
          success: false,
          error: responseData.message || 'Failed to fetch profile',
        }
      }
    } catch (error: unknown) {
      setProfile(defaultProfile)
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to fetch profile',
      }
    }
  }

  const getSelfProfile = async ({
    uuid,
    token,
  }: {
    uuid: string
    token: string
  }): Promise<ApiResponse<Profile>> => {
    try {
      const endpoints = getApiEndpoints()
      const data = await $fetch<{
        data?: Profile
        state?: boolean
        message?: string
      }>(`${endpoints.GET_USER_PROFILE}/${uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (data && data.state && data.data) {
        setProfile(data.data)
        return { success: true, data: data.data, state: true }
      } else {
        setProfile(defaultProfile)
        return { success: false, error: 'Invalid profile data' }
      }
    } catch (error: unknown) {
      setProfile(defaultProfile)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get profile',
        state: false,
      }
    }
  }

  const follow = async ({
    uuid,
    token,
  }: {
    uuid: string
    token: string
  }): Promise<ApiResponse<unknown>> => {
    try {
      const endpoints = getApiEndpoints()
      const responseData = await $fetch<{
        data: User
        state: boolean
        message: string
      }>(`${endpoints.FOLLOW}/${uuid}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (responseData.state && responseData.data) {
        // Update auth store user data like in old store
        const authStore = useAuthStore()
        authStore.setUser(responseData.data)
      }

      return {
        success: responseData.state,
        data: responseData.data,
        message: responseData.message,
      }
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Follow failed',
        state: false,
      }
    }
  }

  const unfollow = async ({
    uuid,
    token,
  }: {
    uuid: string
    token: string
  }): Promise<ApiResponse<unknown>> => {
    try {
      const endpoints = getApiEndpoints()
      const responseData = await $fetch<{
        data: User
        state: boolean
        message: string
      }>(`${endpoints.UNFOLLOW}/${uuid}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (responseData.state && responseData.data) {
        // Update auth store user data like in old store
        const authStore = useAuthStore()
        authStore.setUser(responseData.data)
      }

      return {
        success: responseData.state,
        data: responseData.data,
        message: responseData.message,
      }
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unfollow failed',
        state: false,
      }
    }
  }

  const likePost = async ({
    postUUID,
    token,
  }: {
    postUUID: string
    token: string
  }): Promise<ApiResponse<unknown>> => {
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
        },
      })

      if (responseData.state) {
        // Update the specific post like in old store
        updatePost(responseData.data)
      }

      return {
        success: responseData.state,
        data: responseData.data,
        message: responseData.message,
      }
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to like post',
      }
    }
  }

  const unlikePost = async ({
    postUUID,
    token,
  }: {
    postUUID: string
    token: string
  }): Promise<ApiResponse<unknown>> => {
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
        },
      })

      if (responseData.state) {
        // Update the specific post like in old store
        updatePost(responseData.data)
      }

      return {
        success: responseData.state,
        data: responseData.data,
        message: responseData.message,
      }
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to unlike post',
      }
    }
  }

  return {
    // State
    profile,

    // Getters
    posts,

    // Actions
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
