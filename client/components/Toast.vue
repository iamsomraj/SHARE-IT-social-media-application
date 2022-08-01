<template>
  <!-- BEGIN: TOAST COMPONENT -->
  <div
    v-if="message"
    :title="message"
    :class="`${background}  ${border}  ${textColor}`"
    class="p-3 rounded-full text-center text-xs font-bold max-w-xs break-words"
  >
    {{ message }}
  </div>
  <!-- END: TOAST COMPONENT -->
</template>

<script>
export default {
  name: 'Error',
  props: {
    variant: {
      type: String,
      default: 'error',
      validator(value) {
        return ['error', 'success', 'info', 'warning'].includes(value);
      },
    },
    message: {
      type: String,
      required: true,
    },
  },
  computed: {
    border() {
      const variants = {
        error: 'border-red-500',
        success: 'border-green-500',
        info: 'border-blue-500',
        warning: 'border-yellow-500',
      };
      return variants[this.variant];
    },
    background() {
      const variants = {
        error: 'bg-red-100',
        success: 'bg-green-100',
        info: 'bg-blue-100',
        warning: 'bg-yellow-100',
      };
      return variants[this.variant];
    },
    textColor() {
      const variants = {
        error: 'text-red-500',
        success: 'text-green-500',
        info: 'text-blue-500',
        warning: 'text-yellow-500',
      };
      return variants[this.variant];
    },
    toastMessage() {
      if (this.message.length < 60) {
        return this.message;
      } else {
        return this.message.substring(0, 60) + '...';
      }
    },
  },
};
</script>
