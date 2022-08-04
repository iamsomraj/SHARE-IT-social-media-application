<template>
  <button
    :disabled="disabled"
    class="w-full rounded border bg-white py-2 font-bold text-gray-900 transition-all duration-300 hover:bg-gray-200"
    :class="{ 'cursor-not-allowed opacity-50': loading || disabled }"
    @click="onClick"
  >
    <slot name="default"></slot>
    <slot name="loading" v-if="loading"></slot>
  </button>
</template>

<script>
export default {
  name: 'SecondaryButton',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['onClick'],
  methods: {
    onClick(event) {
      event.preventDefault();
      this.$emit('onClick');
    },
  },
};
</script>
