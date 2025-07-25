import type {
  BaseComponentProps,
  LoadableComponentProps,
  DisableableComponentProps,
  ButtonVariant,
  InputType,
  InputEvent,
  TextAreaEvent,
  FormEvent,
  ClickEvent,
  EmitFunction,
} from './common'

export interface ButtonProps
  extends LoadableComponentProps,
    DisableableComponentProps {
  variant?: ButtonVariant
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

export interface ButtonEmits {
  onClick: []
}

// Input component types
export interface TextInputProps extends BaseComponentProps {
  modelValue?: string
  type?: InputType
  placeholder?: string
  required?: boolean
  readonly?: boolean
  maxlength?: number
}

export interface TextInputEmits {
  'update:modelValue': [value: string]
  onFocus: [event: InputEvent]
  onBlur: [event: InputEvent]
  onChange: [event: InputEvent]
}

// Textarea component types
export interface TextAreaProps extends BaseComponentProps {
  modelValue?: string
  placeholder?: string
  rows?: number
  cols?: number
  maxlength?: number
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  required?: boolean
  readonly?: boolean
}

export interface TextAreaEmits {
  'update:modelValue': [value: string]
  onFocus: [event: TextAreaEvent]
  onBlur: [event: TextAreaEvent]
  onChange: [event: TextAreaEvent]
  onInput: [event: TextAreaEvent]
  onEnter: [value: string]
}

// Form component types
export interface FormProps extends BaseComponentProps {
  loading?: boolean
  novalidate?: boolean
}

export interface FormEmits {
  onSubmit: [event: FormEvent]
  onReset: [event: FormEvent]
}

// Modal/Dialog component types
export interface ModalProps extends BaseComponentProps {
  show: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
  backdrop?: boolean
  centered?: boolean
}

export interface ModalEmits {
  onClose: []
  onShow: []
  onHide: []
}

// Dropdown component types
export interface DropdownOption<T = string> {
  label: string
  value: T
  disabled?: boolean
  icon?: string
}

export interface DropdownProps<T = string> extends BaseComponentProps {
  options: DropdownOption<T>[]
  modelValue?: T
  placeholder?: string
  searchable?: boolean
  multiple?: boolean
  clearable?: boolean
  loading?: boolean
  disabled?: boolean
}

export interface DropdownEmits<T = string> {
  'update:modelValue': [value: T | T[]]
  onChange: [value: T | T[]]
  onSearch: [query: string]
}

// List component types
export interface ListItemProps<T = unknown> extends BaseComponentProps {
  item: T
  index: number
  selected?: boolean
  clickable?: boolean
}

export interface ListItemEmits<T = unknown> {
  onClick: [item: T, index: number]
  onSelect: [item: T, index: number]
}

export interface ListProps<T = unknown> extends BaseComponentProps {
  items: T[]
  keyField?: keyof T
  loading?: boolean
  empty?: boolean
  emptyMessage?: string
}

export interface ListEmits<T = unknown> {
  onItemClick: [item: T, index: number]
  onItemSelect: [item: T, index: number]
}

// Table component types
export interface TableColumn<T = unknown> {
  key: keyof T
  label: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  formatter?: (value: unknown, row: T) => string
}

export interface TableProps<T = unknown> extends BaseComponentProps {
  columns: TableColumn<T>[]
  data: T[]
  loading?: boolean
  sortBy?: keyof T
  sortDirection?: 'asc' | 'desc'
  selectable?: boolean
  selectedRows?: T[]
}

export interface TableEmits<T = unknown> {
  onSort: [column: keyof T, direction: 'asc' | 'desc']
  onRowClick: [row: T, index: number]
  onRowSelect: [rows: T[]]
}

// Pagination component types
export interface PaginationProps extends BaseComponentProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  showInfo?: boolean
  showSizeChanger?: boolean
  pageSizeOptions?: number[]
}

export interface PaginationEmits {
  onPageChange: [page: number]
  onSizeChange: [size: number]
}

// Search component types
export interface SearchProps extends BaseComponentProps {
  modelValue?: string
  placeholder?: string
  loading?: boolean
  debounce?: number
  minLength?: number
}

export interface SearchEmits {
  'update:modelValue': [value: string]
  onSearch: [query: string]
  onClear: []
}

// Avatar component types
export interface AvatarProps extends BaseComponentProps {
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'square'
  clickable?: boolean
}

export interface AvatarEmits {
  onClick: [event: ClickEvent]
}

// Badge component types
export interface BadgeProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
  count?: number
  showZero?: boolean
}

// Card component types
export interface CardProps extends BaseComponentProps {
  title?: string
  subtitle?: string
  shadow?: boolean
  border?: boolean
  hoverable?: boolean
  loading?: boolean
}

export interface CardEmits {
  onClick: [event: ClickEvent]
}

// Layout component types
export interface ContainerProps extends BaseComponentProps {
  fluid?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export interface GridProps extends BaseComponentProps {
  cols?: number
  gap?: number
  responsive?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

// Navigation component types
export interface NavItem {
  label: string
  path?: string
  icon?: string
  active?: boolean
  disabled?: boolean
  children?: NavItem[]
}

export interface NavigationProps extends BaseComponentProps {
  items: NavItem[]
  vertical?: boolean
  collapsed?: boolean
}

export interface NavigationEmits {
  onItemClick: [item: NavItem]
  onToggle: [collapsed: boolean]
}

// Specific component types for the social media app
import type { User, Post } from '~/types/auth'

// Post component types
export interface PostItemProps {
  post: Post
  showActions?: boolean
  compact?: boolean
}

export interface PostItemEmits {
  onLike: [postUuid: string]
  onUnlike: [postUuid: string]
  onComment: [postUuid: string]
  onShare: [postUuid: string]
  onEdit: [postUuid: string]
  onDelete: [postUuid: string]
}

// Profile component types
export interface ProfileCardProps {
  user: User
  showStats?: boolean
  showFollowButton?: boolean
  variant?: 'default' | 'compact' | 'detailed'
}

export interface ProfileCardEmits {
  onFollow: [userUuid: string]
  onUnfollow: [userUuid: string]
  onMessage: [userUuid: string]
  onViewProfile: [userUuid: string]
}

// User list component types
export interface UserListProps {
  users: User[]
  loading?: boolean
  emptyMessage?: string
  showFollowButtons?: boolean
}

export interface UserListEmits {
  onUserSelect: [user: User]
  onFollow: [userUuid: string]
  onUnfollow: [userUuid: string]
  onLoadMore: []
}

// Post input component types
export interface PostInputProps extends BaseComponentProps {
  modelValue?: string
  placeholder?: string
  maxLength?: number
  loading?: boolean
  multiline?: boolean
  showCharCount?: boolean
}

export interface PostInputEmits {
  'update:modelValue': [value: string]
  onSubmit: [content: string]
  onCancel: []
  onFocus: []
  onBlur: []
}

// Search component types
export interface SearchInputProps extends BaseComponentProps {
  modelValue?: string
  placeholder?: string
  loading?: boolean
  debounceMs?: number
  showClearButton?: boolean
}

export interface SearchInputEmits {
  'update:modelValue': [value: string]
  onSearch: [query: string]
  onClear: []
  onFocus: []
  onBlur: []
}

// Generic component emit helper
export type ComponentEmits<T extends Record<string, unknown[]>> =
  EmitFunction<T>

// Component ref types
export interface ComponentRef {
  $el: HTMLElement
}

export interface InputRef extends ComponentRef {
  focus(): void
  blur(): void
  select(): void
}

export interface FormRef extends ComponentRef {
  submit(): void
  reset(): void
  validate(): Promise<boolean>
}

// Slot types
export interface DefaultSlot {
  default?: () => unknown
}

export interface NamedSlots {
  [key: string]: () => unknown
}

// Composable return types
export interface UseFormReturn<T> {
  data: Ref<T>
  errors: Ref<Partial<Record<keyof T, string>>>
  loading: Ref<boolean>
  touched: Ref<Partial<Record<keyof T, boolean>>>
  isDirty: ComputedRef<boolean>
  isValid: ComputedRef<boolean>
  setValue: (field: keyof T, value: T[keyof T]) => void
  setError: (field: keyof T, error: string) => void
  clearError: (field: keyof T) => void
  clearErrors: () => void
  reset: () => void
  submit: () => Promise<void>
}
