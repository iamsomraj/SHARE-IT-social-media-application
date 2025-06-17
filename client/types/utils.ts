// Utility types for enhanced type safety and reusability

// Make all properties optional (reuse built-in if available)
export type PartialType<T> = {
  [P in keyof T]?: T[P]
}

// Make all properties required (reuse built-in if available)
export type RequiredType<T> = {
  [P in keyof T]-?: T[P]
}

// Pick specific properties from a type (reuse built-in if available)
export type PickType<T, K extends keyof T> = {
  [P in K]: T[P]
}

// Omit specific properties from a type (reuse built-in if available)
export type OmitType<T, K extends keyof T> = PickType<T, Exclude<keyof T, K>>

// Create a type with specific keys
export type RecordType<K extends string | number | symbol, T> = {
  [P in K]: T
}

// Non-nullable type (reuse built-in if available)
export type NonNullableType<T> = T extends null | undefined ? never : T

// Extract function return type
export type ReturnTypeHelper<T extends (...args: unknown[]) => unknown> =
  T extends (...args: unknown[]) => infer R ? R : unknown

// Extract function parameters
export type ParametersHelper<T extends (...args: unknown[]) => unknown> =
  T extends (...args: infer P) => unknown ? P : never

// Create union from object values
export type ValueOf<T> = T[keyof T]

// Create union from array elements
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

// Deep readonly type
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

// Deep partial type
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Flatten nested types
export type Flatten<T> = T extends Array<infer U> ? U : T

// Create optional fields type
export type OptionalFields<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>

// Create required fields type
export type RequiredFields<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>

// Exact type (no excess properties)
export type Exact<T, Shape> = T extends Shape
  ? Exclude<keyof T, keyof Shape> extends never
    ? T
    : never
  : never

// Brand types for type safety
export type Brand<T, B> = T & { __brand: B }

// ID types
export type UserId = Brand<number, 'UserId'>
export type PostId = Brand<number, 'PostId'>
export type UUID = Brand<string, 'UUID'>
export type Token = Brand<string, 'Token'>

// API-specific utility types
export type ApiSuccessResponse<T> = {
  success: true
  data: T
  message?: string
}

export type ApiErrorResponse = {
  success: false
  error: string
  message?: string
}

export type ApiResponseUnion<T> = ApiSuccessResponse<T> | ApiErrorResponse

// Store-specific utility types
export type StoreGetter<T> = () => T
export type StoreAction<Args extends unknown[] = [], Return = void> = (
  ...args: Args
) => Return
export type AsyncStoreAction<Args extends unknown[] = [], Return = void> = (
  ...args: Args
) => Promise<Return>

// Component prop utility types
export type ComponentProps<T> = T extends { $props: infer P } ? P : never
export type ComponentEmits<T> = T extends { $emit: infer E } ? E : never

// Vue 3 specific utility types
export type Ref<T> = import('vue').Ref<T>
export type ComputedRef<T> = import('vue').ComputedRef<T>
export type WritableComputedRef<T> = import('vue').WritableComputedRef<T>

// Event handler types
export type EventHandler<T = Event> = (event: T) => void
export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>

// Form validation types
export type ValidationRule<T = unknown> = (value: T) => string | true
export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[]
}

// Conditional types for better type inference
export type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B

// Mutable type (removes readonly)
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

// Type-safe object keys
export type ObjectKeys<T> = keyof T
export type ObjectValues<T> = T[keyof T]
export type ObjectEntries<T> = Array<[keyof T, T[keyof T]]>
