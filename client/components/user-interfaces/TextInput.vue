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
  interface Props {
    modelValue?: string
    type?: string
    placeholder?: string
  }

  withDefaults(defineProps<Props>(), {
    modelValue: '',
    type: 'text',
    placeholder: '',
  })

  const emit = defineEmits<{
    'update:modelValue': [value: string]
  }>()

  const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
  }
</script>
