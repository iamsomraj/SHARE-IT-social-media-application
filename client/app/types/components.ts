import type { InputEvent } from './common'

interface BaseComponentProps {
  class?: string
  id?: string
}

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger'

export interface ButtonProps extends BaseComponentProps {
  loading?: boolean
  disabled?: boolean
  variant?: ButtonVariant
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

export interface ButtonEmits {
  onClick: []
}

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'

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
