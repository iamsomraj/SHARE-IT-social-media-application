<template>
  <input
    class="w-full rounded border-2 border-slate-200 px-4 py-3 text-slate-600 outline-none focus:border-blue-200"
    :placeholder="placeholder"
    autocomplete="off"
    :type="type"
    :value="value"
    @change="onChange"
    @input="onInput"
  />
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['change', 'input'],
  methods: {
    onChange(event) {
      this.$emit('change', event.target.value);
    },
    onInput(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>
