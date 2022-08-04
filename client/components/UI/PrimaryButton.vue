<template>
  <button
    :disabled="disabled"
    class="w-full rounded border bg-blue-400 py-2 font-bold text-white transition-all duration-300 hover:bg-blue-500"
    :class="{ 'cursor-not-allowed opacity-50': loading || disabled }"
    @click="onClick"
  >
    <slot name="default"></slot>
    <slot name="loading" v-if="loading"></slot>
  </button>
</template>

<script>
export default {
  name: 'PrimaryButton',
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
