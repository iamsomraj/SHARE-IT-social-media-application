<template>
  <div class="w-full">
    <!-- BEGIN: POST TEXT INPUT -->
    <input
      class="w-full rounded border-b-2 border-gray-200 py-3 outline-none focus:border-blue-200"
      :placeholder="placeholder"
      :maxlength="maxlength"
      autocomplete="off"
      :type="type"
      :value="value"
      @change="onChange"
      @input="onInput"
      @keydown.enter="onEnter"
    />
    <!-- END: POST TEXT INPUT -->

    <!-- BEGIN: CHARACTERS LEFT FROM LIMIT -->
    <div class="my-2 w-full text-right text-xs text-gray-200">
      {{ charactersLeft }}
    </div>
    <!-- END: CHARACTERS LEFT FROM LIMIT -->
  </div>
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
  data() {
    return {
      maxLength: 160,
    };
  },
  computed: {
    charactersLeft() {
      return this.maxLength - this.value.length;
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
