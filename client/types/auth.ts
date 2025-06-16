export interface User {
  id: string
  uuid: string
  name: string
  email: string
  person_followers: readonly PersonFollower[]
  person_followings: readonly PersonFollowing[]
  person_stats: PersonStats
  person_posts: readonly Post[]
}

export interface PersonFollower {
  id: string
  person_id: string
  followed_id: string
  created_at: string
  updated_at: string
  follower?: User
}

export interface PersonFollowing {
  id: string
  person_id: string
  followed_id: string
  created_at: string
  updated_at: string
  following?: User
}

export interface PersonStats {
  id: string
  person_id: string
  post_count: number
  follower_count: number
  following_count: number
}

export interface Post {
  id: string
  uuid: string
  person_id: string
  content: string
  created_at: string
  updated_at: string
  person?: User
  creator?: User // Legacy alias for person
  post_likes?: readonly PostLike[]
  post_stats?: PostStats
  post_stories?: readonly PostStory[]
}

export interface PostLike {
  id: string
  post_id: string
  person_id: string
  created_at: string
  updated_at: string
  person?: User
  creator?: User // For consistency with other interfaces
}

export interface PostStats {
  id: string
  post_id: string
  like_count: number
  comment_count: number
  story_count: number
}

export interface AuthState {
  user: User
  token: string | null
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
  state?: boolean
}

export interface AuthResponse {
  token: string
  user: User
}

export interface PostStory {
  id: string
  post_id: string
  person_id: string
  created_at: string
  updated_at: string
  creator?: User
}
