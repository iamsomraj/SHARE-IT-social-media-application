import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { User, ApiResponse } from '~/types/auth'
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
      const response = await $fetch(`${endpoints.FOLLOW}/${uuid}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return { success: true, data: response, state: true }
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
      const response = await $fetch(`${endpoints.UNFOLLOW}/${uuid}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return { success: true, data: response, state: true }
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
        data: unknown
        state: boolean
        message: string
      }>(`${endpoints.ADD_LIKE}/${postUUID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (responseData.state) {
        // Refresh the profile to get updated posts
        await getUserProfile({ uuid: profile.value.uuid, token })
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
        data: unknown
        state: boolean
        message: string
      }>(`${endpoints.REMOVE_LIKE}/${postUUID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (responseData.state) {
        // Refresh the profile to get updated posts
        await getUserProfile({ uuid: profile.value.uuid, token })
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
    profile: readonly(profile),

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
