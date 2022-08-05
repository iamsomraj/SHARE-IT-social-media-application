<template>
  <input
    class="w-full rounded border-b-2 border-gray-200 py-3 outline-none focus:border-blue-200"
    :placeholder="placeholder"
    autocomplete="off"
    :type="type"
    :value="value"
    @change="onChange"
    @input="onInput"
    @keydown.enter="onEnter"
  />
</template>

<script>
export default {
  name: 'PostInput',
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
      event.preventDefault();
      this.$emit('change', event.target.value);
    },
    onInput(event) {
      event.preventDefault();
      this.$emit('input', event.target.value);
    },
    onEnter(event) {
      event.preventDefault();
      this.$emit('onEnter', event.target.value);
    },
  },
};
</script>
