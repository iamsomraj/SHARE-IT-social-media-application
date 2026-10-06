// =========================
// ENTITY TYPES
// =========================

export interface BaseEntity {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface AuditableEntity extends BaseEntity {
  created_by: number;
  updated_by: number;
}

export interface Person extends BaseEntity {
  uuid: string;
  name: string;
  email: string;
  password: string;
  is_deleted: boolean;
}

export type PublicPerson = Omit<Person, 'password'>;

export interface PersonStats extends BaseEntity {
  person_id: number;
  post_count: number;
  follower_count: number;
  following_count: number;
}

export interface Following extends AuditableEntity {
  follower_id: number;
  followed_id: number;
}

export interface Post extends AuditableEntity {
  uuid: string;
  content: string;
  is_deleted: boolean;
}

export interface PostStats extends BaseEntity {
  post_id: number;
  like_count: number;
  comment_count: number;
  story_count: number;
}

export interface PostLike extends AuditableEntity {
  post_id: number;
}

export interface PostStory {
  id: number;
  post_id: number;
  person_id: number;
  created_at: string;
}

// =========================
// AUTH TYPES
// =========================

/** Identity attached to `req.user` by the auth middleware. */
export interface AuthUser {
  id: number;
}

export interface TokenPayload {
  id: number;
}

export type AuthResponse = PublicPerson & { token: string };

// =========================
// API RESPONSE
// =========================

export interface ApiResponse<T = unknown> {
  state: boolean;
  message: string;
  data?: T;
}

// =========================
// EXPRESS AUGMENTATION
// =========================

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
