<template>
  <!-- BEGIN: TOAST COMPONENT ROOT ELEMENT -->
  <div
    v-if="toasts.length > 0"
    class="fixed m-5 flex w-full flex-col items-center justify-center"
  >
    <!-- BEGIN: TOAST LIST -->
    <div v-for="toast in toasts" :key="toast.id">
      <!-- BEGIN: TOAST ITEM -->
      <div
        :title="toast.message"
        :class="`${background(toast.variant)} ${textColor(toast.variant)}`"
        class="my-2 w-48 break-words rounded-lg px-4 py-2 text-center text-xs font-bold shadow-sm"
      >
        <div>
          {{ toast.message }}
        </div>
      </div>
      <!-- END: TOAST ITEM -->
    </div>
    <!-- END: TOAST LIST -->
  </div>
  <!-- BEGIN: TOAST COMPONENT ROOT ELEMENT -->
</template>

<script>
export default {
  name: 'ToastComponent',
  computed: {
    toasts() {
      return this.$store.getters['toast/toasts'];
    },
  },
  methods: {
    background(variant) {
      const variants = {
        error: 'bg-red-100',
        success: 'bg-green-100',
        info: 'bg-blue-100',
        warning: 'bg-yellow-100',
      };
      return variants[variant];
    },
    textColor(variant) {
      const variants = {
        error: 'text-red-500',
        success: 'text-green-500',
        info: 'text-blue-500',
        warning: 'text-yellow-500',
      };
      return variants[variant];
    },
    toastMessage(message) {
      if (message.length < 60) {
        return message;
      } else {
        return message.substring(0, 60) + '...';
      }
    },
  },
};
</script>
