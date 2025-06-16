<template>
  <!-- BEGIN: TOAST COMPONENT ROOT ELEMENT -->
  <div
    v-if="toasts.length > 0"
    class="fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col items-end gap-2"
  >
    <!-- BEGIN: TOAST LIST -->
    <TransitionGroup name="toast" tag="div" class="space-y-2">
      <div v-for="toast in toasts" :key="toast.id" class="relative">
        <!-- BEGIN: TOAST ITEM -->
        <div
          :title="toast.message"
          :class="`${background(toast.type)} ${textColor(toast.type)}`"
          class="relative w-80 cursor-pointer break-words rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all hover:shadow-xl"
          @click="removeToast(toast.id)"
        >
          <div class="pr-6">
            {{ toast.message }}
          </div>
          <!-- Close button -->
          <button
            @click.stop="removeToast(toast.id)"
            class="absolute right-2 top-2 text-current opacity-70 transition-opacity hover:opacity-100"
          >
            ×
          </button>
        </div>
        <!-- END: TOAST ITEM -->
      </div>
    </TransitionGroup>
    <!-- END: TOAST LIST -->
  </div>
  <!-- END: TOAST COMPONENT ROOT ELEMENT -->
</template>

<script setup lang="ts">
  const toastStore = useToastStore()

  const toasts = computed(() => toastStore.toasts)

  const removeToast = (id: string) => {
    toastStore.removeToast(id)
  }

  const background = (variant: string) => {
    const variants: Record<string, string> = {
      error: 'bg-red-100 border border-red-300',
      success: 'bg-green-100 border border-green-300',
      info: 'bg-blue-100 border border-blue-300',
      warning: 'bg-yellow-100 border border-yellow-300',
    }
    return variants[variant]
  }

  const textColor = (variant: string) => {
    const variants: Record<string, string> = {
      error: 'text-red-800',
      success: 'text-green-800',
      info: 'text-blue-800',
      warning: 'text-yellow-800',
    }
    return variants[variant]
  }
</script>

<style scoped>
  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.3s ease;
  }

  .toast-enter-from {
    opacity: 0;
    transform: translateX(100%);
  }

  .toast-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }

  .toast-move {
    transition: transform 0.3s ease;
  }
</style>
