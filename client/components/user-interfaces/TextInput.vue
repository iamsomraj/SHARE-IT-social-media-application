<template>
  <input
    class="outline-none w-full rounded border-2 border-gray-200 px-4 py-3 focus:border-blue-200"
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
