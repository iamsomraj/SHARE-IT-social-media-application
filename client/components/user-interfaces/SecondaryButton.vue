<template>
  <button
    :disabled="disabled"
    class="w-full rounded border bg-white py-2 font-bold text-slate-600 transition-all duration-300 hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
    :class="{ 'cursor-not-allowed opacity-50': loading || disabled }"
    @click="onClick"
  >
    <div
      v-if="loading"
      class="flex w-full animate-spin items-center justify-center"
    >
      <loader-icon />
    </div>
    <slot v-else name="default"></slot>
  </button>
</template>

<script>
import LoaderIcon from '../assets/LoaderIcon.vue';
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
  components: { LoaderIcon },
};
</script>
