import type {
  BaseEntity,
  EntityWithUuid,
  AuditableEntity,
  ApiResponse,
} from './common'

// User-related types
export interface PersonStats extends BaseEntity {
  person_id: number
  post_count: number
  follower_count: number
  following_count: number
}

export interface PersonFollower extends AuditableEntity {
  follower_id: number
  followed_id: number
}

export interface PersonFollowing extends AuditableEntity {
  follower_id: number
  followed_id: number
}

// Core User interface
export interface User extends EntityWithUuid {
  name: string
  email: string
  is_deleted: boolean
  person_followers: readonly PersonFollower[]
  person_followings: readonly PersonFollowing[]
  person_stats: PersonStats
  person_posts: readonly Post[]
  token?: string
}

// Post-related types
export interface PostStats extends BaseEntity {
  post_id: number
  like_count: number
  comment_count: number
  story_count: number
}

export interface PostLike extends AuditableEntity {
  post_id: number
  creator: User
  person?: User
}

export interface PostStory extends BaseEntity {
  post_id: number
  person_id: number
  creator?: User
}

export interface Post extends EntityWithUuid, AuditableEntity {
  content: string
  is_deleted: boolean
  post_likes: readonly PostLike[]
  post_stats: PostStats
  creator: User
  post_stories?: readonly PostStory[]
}

// Auth-related types
export interface AuthState {
  user: User
  token: string | null
}

export interface AuthResponse {
  state: boolean
  data: User & { token: string }
  message: string
}

// Specific API response types for auth operations
export interface LoginApiResponse
  extends ApiResponse<User & { token: string }> {}
export interface RegisterApiResponse
  extends ApiResponse<User & { token: string }> {}
export interface ProfileApiResponse extends ApiResponse<User> {}
export interface PostCreateApiResponse extends ApiResponse<Post> {}
export interface PostLikeApiResponse extends ApiResponse<Post> {}
export interface FollowApiResponse extends ApiResponse<PersonFollower> {}
export interface SearchApiResponse extends ApiResponse<User[]> {}

// Login/Register request types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

// Profile types
export interface Profile extends User {}

// Search types
export interface SearchPeopleRequest {
  query: string
  limit?: number
  offset?: number
}

export interface SearchPeopleResponse extends ApiResponse<User[]> {}

// Follow/Unfollow types
export interface FollowRequest {
  uuid: string
}

export interface FollowResponse extends ApiResponse<PersonFollower> {}

// Post creation types
export interface CreatePostRequest {
  content: string
}

export interface CreatePostResponse extends ApiResponse<Post> {}

// Post interaction types
export interface PostLikeRequest {
  postUUID: string
}

export interface PostLikeResponse extends ApiResponse<Post> {}

export interface PostStoryRequest {
  postUUID: string
}

export interface PostStoryResponse extends ApiResponse<Post> {}

// Feed types
export interface FeedRequest {
  page?: number
  limit?: number
}

export interface FeedResponse extends ApiResponse<Post[]> {}

// Profile fetch types
export interface GetProfileRequest {
  uuid: string
}

export interface GetProfileResponse extends ApiResponse<Profile> {}

// Store operation types - more specific than ApiResponse<unknown>
export interface PostOperationResult extends ApiResponse<Post> {}
export interface UserOperationResult extends ApiResponse<User> {}
export interface FollowOperationResult extends ApiResponse<PersonFollower> {}
export interface SearchOperationResult extends ApiResponse<User[]> {}

// Store payload types
export interface AuthStorePayload {
  email: string
  password: string
}

export interface RegisterStorePayload {
  name: string
  email: string
  password: string
}

export interface PostStorePayload {
  content: string
  token: string
}

export interface LikePostPayload {
  postUUID: string
  token: string
}

export interface FollowUserPayload {
  uuid: string
  token: string
}

export interface FetchProfilePayload {
  uuid: string
  token: string
}

// Component prop types
export interface UserCardProps {
  person: User
}

export interface PostCardProps {
  id: number
  uuid: string
  content: string
  created_at: string
  updated_at: string
  creator: User
  post_likes: readonly PostLike[]
  post_stats: PostStats
  post_stories?: readonly PostStory[]
}

export interface ProfileHeaderProps {
  uuid: string
  id: number
  name: string
  email: string
  numberOfPosts: number
  numberOfFollowers: number
  numberOfFollowings: number
}

export interface ProfileStatsProps {
  numberOfPosts?: number
  numberOfFollowers?: number
  numberOfFollowings?: number
}

export interface ProfilePictureProps {
  uuid: string
  name: string
}

export interface PostInputProps {
  modelValue?: string
  type?: string
  placeholder?: string
  loading?: boolean
}

// Component emit types
export interface PostCardEmits {
  onPostLike: [uuid: string]
  onPostUnlike: [uuid: string]
}

export interface ProfileBodyEmits {
  onPostLike: [uuid: string]
  onPostUnlike: [uuid: string]
  onUserFollow: [uuid: string]
}

export interface PostInputEmits {
  'update:modelValue': [value: string]
  onEnter: [value: string]
}

// Utility types
export type PostWithoutRelations = Omit<
  Post,
  'creator' | 'post_likes' | 'post_stories'
>
export type UserWithoutRelations = Omit<
  User,
  'person_followers' | 'person_followings' | 'person_posts'
>
export type UserSummary = Pick<User, 'id' | 'uuid' | 'name' | 'email'>
export type PostSummary = Pick<
  Post,
  'id' | 'uuid' | 'content' | 'created_at' | 'updated_at'
>
