<template>
  <input
    class="w-full rounded border-2 border-slate-200 px-4 py-3 text-slate-600 outline-none focus:border-blue-200"
    :placeholder="placeholder"
    autocomplete="off"
    :type="type"
    :value="modelValue"
    @input="onInput"
  />
</template>

<script setup lang="ts">
  import type { InputEvent } from '~/types/common'
  import type { TextInputProps, TextInputEmits } from '~/types/components'

  withDefaults(defineProps<TextInputProps>(), {
    modelValue: '',
    type: 'text',
    placeholder: '',
    required: false,
    readonly: false,
  })

  const emit = defineEmits<TextInputEmits>()

  const onInput = (event: Event) => {
    const inputEvent = event as InputEvent
    emit('update:modelValue', inputEvent.target.value)
  }
</script>
