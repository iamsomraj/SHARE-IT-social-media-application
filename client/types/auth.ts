export interface User {
  id: number
  uuid: string
  name: string
  email: string
  created_at: string
  updated_at: string
  is_deleted: boolean
  person_followers: readonly PersonFollower[]
  person_followings: readonly PersonFollowing[]
  person_stats: PersonStats
  person_posts: readonly Post[]
  token?: string // Optional token field for login response
}

export interface PersonFollower {
  id: number
  follower_id: number
  followed_id: number
  created_at: string
  updated_at: string | null
  created_by: number
  updated_by: number
}

export interface PersonFollowing {
  id: number
  follower_id: number
  followed_id: number
  created_at: string
  updated_at: string | null
  created_by: number
  updated_by: number
}

export interface PersonStats {
  id: number
  person_id: number
  post_count: number
  follower_count: number
  following_count: number
}

export interface Post {
  id: number
  uuid: string
  content: string
  created_at: string
  updated_at: string
  created_by: number
  updated_by: number
  is_deleted: boolean
  post_likes: readonly PostLike[]
  post_stats: PostStats
  creator: User
  post_stories?: readonly PostStory[]
}

export interface PostLike {
  id: number
  post_id: number
  created_at: string
  updated_at: string
  created_by: number
  updated_by: number
  creator: User
  person?: User // For backward compatibility
}

export interface PostStats {
  id: number
  post_id: number
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
  state: boolean
  data: User
  message: string
}

export interface PostStory {
  id: number
  post_id: number
  person_id: number
  created_at: string
  updated_at: string
  creator?: User
}
