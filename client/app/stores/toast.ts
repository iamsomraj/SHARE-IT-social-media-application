import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<ToastMessage[]>([])
  // Timer handles are not state, so they stay out of the reactive store.
  const timeouts = new Map<string, ReturnType<typeof setTimeout>>()

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
    const newToast: ToastMessage = {
      id,
      duration: toast.duration ?? 3000,
      ...toast,
    }

    toasts.value.push(newToast)

    if (newToast.duration && newToast.duration > 0 && import.meta.client) {
      const timeoutId = setTimeout(() => {
        removeToast(id)
      }, newToast.duration)

      timeouts.set(id, timeoutId)
    }
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }

    const timeoutId = timeouts.get(id)
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeouts.delete(id)
    }
  }

  const success = (message: string, duration = 3000) => {
    addToast({ message, type: 'success', duration })
  }

  const error = (message: string, duration = 3000) => {
    addToast({ message, type: 'error', duration })
  }

  const warning = (message: string, duration = 3000) => {
    addToast({ message, type: 'warning', duration })
  }

  const info = (message: string, duration = 3000) => {
    addToast({ message, type: 'info', duration })
  }

  const clear = () => {
    timeouts.forEach(timeoutId => {
      clearTimeout(timeoutId)
    })
    timeouts.clear()

    toasts.value = []
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clear,
  }
})
