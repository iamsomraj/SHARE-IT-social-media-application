<template>
  <!-- BEGIN: TOAST COMPONENT ROOT ELEMENT -->
  <div
    v-if="toasts.length > 0"
    class="fixed flex w-full flex-col items-center  px-2"
  >
    <!-- BEGIN: TOAST LIST -->
    <div v-for="toast in toasts" :key="toast.id">
      <!-- BEGIN: TOAST ITEM -->
      <div
        :title="toast.message"
        :class="`${background(toast.variant)} ${textColor(toast.variant)}`"
        class="mt-2 w-64 break-words rounded-lg px-4 py-5 text-center text-xs font-bold shadow-sm"
      >
        <div class="line-clamp-2">
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
        error: 'bg-red-300',
        success: 'bg-green-300',
        info: 'bg-blue-300',
        warning: 'bg-yellow-300',
      };
      return variants[variant];
    },
    textColor(variant) {
      const variants = {
        error: 'text-red-700',
        success: 'text-green-700',
        info: 'text-blue-700',
        warning: 'text-yellow-700',
      };
      return variants[variant];
    },
  },
};
</script>
