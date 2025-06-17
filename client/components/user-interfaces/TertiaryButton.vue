<template>
  <button
    :disabled="disabled"
    class="w-full rounded border bg-orange-400 py-2 font-bold text-white transition-all duration-300 hover:bg-orange-300 dark:border-none"
    :class="{ 'cursor-not-allowed opacity-50': loading || disabled }"
    @click="onClick"
  >
    <div
      v-if="loading"
      class="flex w-full animate-spin items-center justify-center"
    >
      <loader-icon />
    </div>
    <slot v-else name="default" />
  </button>
</template>

<script setup lang="ts">
  import type { ButtonProps, ButtonEmits } from '~/types/components'

  withDefaults(defineProps<ButtonProps>(), {
    loading: false,
    disabled: false,
    variant: 'tertiary',
    type: 'button',
    fullWidth: false,
  })

  const emit = defineEmits<ButtonEmits>()

  const onClick = (event: MouseEvent) => {
    event.preventDefault()
    emit('onClick')
  }
</script>
