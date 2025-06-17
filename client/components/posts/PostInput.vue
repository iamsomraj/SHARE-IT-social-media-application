<template>
  <div class="w-full px-0 md:px-6">
    <textarea
      :disabled="loading"
      class="w-full resize-none break-words rounded border-b-2 border-slate-200 text-2xl text-slate-400 outline-none placeholder:text-slate-400 focus:border-blue-200 disabled:bg-white dark:border-b-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-600 dark:disabled:bg-slate-800"
      :class="{ 'cursor-not-allowed': loading }"
      :placeholder="inputPlaceholder"
      :maxlength="postLengthLimit"
      autocomplete="off"
      :type="type"
      :value="modelValue"
      @change="onChange"
      @input="onInput"
      @keydown.enter="onEnter"
    />

    <div
      class="my-2 w-full text-right text-xs text-slate-200 dark:text-slate-600"
    >
      {{ charactersLeft }}
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    modelValue?: string
    type?: string
    placeholder?: string
    loading?: boolean
  }

  interface Emits {
    'update:modelValue': [value: string]
    onEnter: [value: string]
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    type: 'text',
    placeholder: '',
    loading: false,
  })

  const emit = defineEmits<Emits>()

  const postLengthLimit = 160

  const charactersLeft = computed(() => {
    return postLengthLimit - props.modelValue.length
  })

  const inputPlaceholder = computed(() => {
    return props.loading ? 'Posting...' : props.placeholder
  })

  const onChange = (event: Event) => {
    event.preventDefault()
    const target = event.target as HTMLTextAreaElement

    if (!event || !target) {
      emit('update:modelValue', '')
      return
    }

    let value = target.value || ''
    if (value.length > postLengthLimit) {
      value = value.slice(0, postLengthLimit)
      target.value = value
    }
    emit('update:modelValue', value)
  }

  const onInput = (event: Event) => {
    event.preventDefault()
    const target = event.target as HTMLTextAreaElement

    if (!event || !target) {
      emit('update:modelValue', '')
      return
    }

    let value = target.value || ''
    if (value.length > postLengthLimit) {
      value = value.slice(0, postLengthLimit)
      target.value = value
    }
    emit('update:modelValue', value)
  }

  const onEnter = (event: Event) => {
    event.preventDefault()
    const target = event.target as HTMLTextAreaElement
    emit('onEnter', target.value)
  }
</script>
