<template>
  <button
    :disabled="disabled"
    class="w-full rounded border bg-blue-400 py-2 font-bold text-white transition-all duration-300 hover:bg-blue-500"
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
    name: "PrimaryButton",
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
    emits: ["onClick"],
    methods: {
        onClick(event) {
            event.preventDefault();
            this.$emit("onClick");
        },
    },
    components: { LoaderIcon }
};
</script>
