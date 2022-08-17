<template>
  <!-- BEGIN: POST INPUT -->
  <div class="w-full px-0 md:px-6">
    <!-- BEGIN: POST TEXT INPUT -->
    <textarea
      :disabled="loading"
      class="w-full resize-none break-words rounded border-b-2 border-slate-200 text-2xl text-slate-600 outline-none placeholder:text-slate-200 focus:border-blue-200 disabled:bg-white dark:border-b-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:disabled:bg-slate-800"
      :class="{ 'cursor-not-allowed': loading }"
      :placeholder="inputPlaceholder"
      :maxlength="postLengthLimit"
      autocomplete="off"
      :type="type"
      :value="value"
      @change="onChange"
      @input="onInput"
      @keydown.enter="onEnter"
    />
    <!-- END: POST TEXT INPUT -->

    <!-- BEGIN: CHARACTERS LEFT FROM LIMIT -->
    <div
      class="my-2 w-full text-right text-xs text-slate-200 dark:text-slate-600"
    >
      {{ charactersLeft }}
    </div>
    <!-- END: CHARACTERS LEFT FROM LIMIT -->
  </div>
  <!-- END: POST INPUT -->
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change', 'input'],
  data() {
    return {
      postLengthLimit: 160,
    };
  },
  computed: {
    charactersLeft() {
      return this.postLengthLimit - this.value.length;
    },
    inputPlaceholder() {
      return this.loading ? 'Posting...' : this.placeholder;
    },
  },

  methods: {
    onChange(event) {
      event.preventDefault();
      if (!event || !event.target || !event.target.value) {
        this.$emit('change', '');
      }

      if (event.target.value.length > this.maxLength) {
        event.target.value = event.target.value.slice(0, this.maxLength);
      }
      this.$emit('change', event.target.value);
    },
    onInput(event) {
      event.preventDefault();
      if (!event || !event.target || !event.target.value) {
        this.$emit('input', '');
      }

      if (event.target.value.length > this.maxLength) {
        event.target.value = event.target.value.slice(0, this.maxLength);
      }
      this.$emit('input', event.target.value);
    },
    onEnter(event) {
      event.preventDefault();
      this.$emit('onEnter', event.target.value);
    },
  },
};
</script>
