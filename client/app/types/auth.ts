import type {
  AuditableEntity,
  BaseEntity,
  EntityWithUuid,
  OperationResult,
} from './common'

// =========================
// PERSON
// =========================

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

export type PersonFollowing = PersonFollower

export interface User extends EntityWithUuid {
  name: string
  email: string
  is_deleted: boolean
  person_followers: readonly PersonFollower[]
  person_followings: readonly PersonFollowing[]
  person_stats: PersonStats
  person_posts: readonly Post[]
}

export type AuthenticatedUser = User & { token: string }

// =========================
// POST
// =========================

export interface PostStats extends BaseEntity {
  post_id: number
  like_count: number
  comment_count: number
  story_count: number
}

export interface PostLike extends AuditableEntity {
  post_id: number
  creator: User
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

// =========================
// STORE RESULTS
// =========================

export type PostOperationResult = OperationResult<Post>
export type UserOperationResult = OperationResult<User>
export type SearchOperationResult = OperationResult<User[]>

// =========================
// COMPONENT PROPS
// =========================

export interface ProfileStatsProps {
  numberOfPosts?: number
  numberOfFollowers?: number
  numberOfFollowings?: number
}

export interface ProfilePictureProps {
  uuid: string
  name: string
}
