// Utility functions with improved type safety
import type { RequestHeaders } from '~/types/common'

const getShortTimeFormat = (
  seconds: number,
  minutes: number,
  hours: number,
  days: number,
  months: number,
  years: number
): string => {
  if (seconds < 60) {
    const rounded = Math.floor(seconds / 10) * 10
    return rounded === 0 ? '10 s' : `${Math.min(rounded, 50)} s`
  }
  if (minutes < 60) return `${minutes} m`
  if (hours < 24) return `${hours} h`
  if (days < 30) return `${days} d`
  if (months < 12) return `${months} mo`
  return `${years} y`
}

export const getTime = (time: string | Date, short = false): string => {
  const date = new Date(time)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (short) {
    return getShortTimeFormat(seconds, minutes, hours, days, months, years)
  }

  if (seconds < 60) {
    return seconds > 1 ? `${seconds} seconds ago` : 'a few seconds ago'
  } else if (minutes < 60) {
    return minutes > 1 ? `${minutes} minutes ago` : 'a few minutes ago'
  } else if (hours < 24) {
    return hours > 1 ? `${hours} hours ago` : 'an hour ago'
  } else if (days < 30) {
    return days > 1 ? `${days} days ago` : 'a day ago'
  } else if (months < 12) {
    return months > 1 ? `${months} months ago` : 'a month ago'
  } else {
    return years > 1 ? `${years} years ago` : 'a year ago'
  }
}

export const getHeaders = (token?: string | null): RequestHeaders => {
  return {
    headers: {
      Authorization: `Bearer ${token || ''}`,
    },
  }
}

// Type-safe object key checker
export const hasOwnProperty = <T extends object, K extends PropertyKey>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> => {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

// Type-safe array checker
export const isArray = <T>(value: unknown): value is T[] => {
  return Array.isArray(value)
}

// Type-safe string checker
export const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

// Type-safe number checker
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value)
}

// Type-safe object checker
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

// Type-safe function to get nested object property
export const getNestedProperty = <T>(
  obj: Record<string, unknown>,
  path: string
): T | undefined => {
  return path.split('.').reduce((current: unknown, key: string) => {
    return isObject(current) && hasOwnProperty(current, key)
      ? current[key]
      : undefined
  }, obj as unknown) as T | undefined
}

// Debounce function with proper typing
export const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// Throttle function with proper typing
export const throttle = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastExecTime = 0

  return (...args: Parameters<T>) => {
    const currentTime = Date.now()

    if (currentTime - lastExecTime >= delay) {
      func(...args)
      lastExecTime = currentTime
    }
  }
}

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Capitalize first letter
export const capitalize = (str: string): string => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Truncate text
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Generate random ID
export const generateId = (prefix = ''): string => {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2)
  return `${prefix}${timestamp}${randomPart}`
}

// Sleep utility
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Clone deep utility
export const cloneDeep = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array)
    return obj.map(item => cloneDeep(item)) as unknown as T
  if (typeof obj === 'object') {
    const clonedObj = {} as { [key in keyof T]: T[key] }
    for (const key in obj) {
      if (hasOwnProperty(obj as Record<string, unknown>, key)) {
        clonedObj[key] = cloneDeep(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}
