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

  // Actions
  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString()
    const newToast: ToastMessage = {
      id,
      duration: 3000,
      ...toast,
    }

    toasts.value.push(newToast)

    // Auto remove after duration
    if (newToast.duration) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
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
