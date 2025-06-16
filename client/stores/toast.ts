import { defineStore } from 'pinia'

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export const useToastStore = defineStore('toast', () => {
  // State
  const toasts = ref<ToastMessage[]>([])
  const timeouts = ref<Map<string, NodeJS.Timeout>>(new Map())

  // Actions
  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newToast: ToastMessage = {
      id,
      duration: 3000,
      ...toast,
    }

    toasts.value.push(newToast)

    // Auto remove after duration (only on client-side)
    if (newToast.duration && newToast.duration > 0 && process.client) {
      const timeoutId = setTimeout(() => {
        removeToast(id)
      }, newToast.duration)

      timeouts.value.set(id, timeoutId)
    }
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }

    // Clear timeout if it exists
    const timeoutId = timeouts.value.get(id)
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeouts.value.delete(id)
    }
  }

  const success = (message: string, duration?: number) => {
    addToast({ message, type: 'success', duration })
  }

  const error = (message: string, duration?: number) => {
    addToast({ message, type: 'error', duration })
  }

  const warning = (message: string, duration?: number) => {
    addToast({ message, type: 'warning', duration })
  }

  const info = (message: string, duration?: number) => {
    addToast({ message, type: 'info', duration })
  }

  const clear = () => {
    // Clear all timeouts
    timeouts.value.forEach(timeoutId => {
      clearTimeout(timeoutId)
    })
    timeouts.value.clear()

    // Clear all toasts
    toasts.value = []
  }

  return {
    // State
    toasts,
    // Actions
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clear,
  }
})
