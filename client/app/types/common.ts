// =========================
// ENTITIES
// =========================

export interface BaseEntity {
  id: number
  created_at: string
  updated_at: string
}

export interface EntityWithUuid extends BaseEntity {
  uuid: string
}

export interface AuditableEntity extends BaseEntity {
  created_by: number
  updated_by: number
}

// =========================
// API
// =========================

/** Envelope returned by every SHARE-IT API endpoint. */
export interface ApiEnvelope<T> {
  state: boolean
  message: string
  data: T
}

/** Normalized result returned by store actions to components. */
export interface OperationResult<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// =========================
// DOM
// =========================

export type InputEvent = Event & {
  target: HTMLInputElement
}
