<template>
  <div class="flex w-full items-center justify-center py-4">
    <div class="mx-6 flex w-full justify-center space-x-2 md:mx-0 md:w-1/2">
      <post-input
        placeholder="Speak your mind"
        v-model="postInput"
        @onEnter="onPostCreate"
      />
    </div>
  </div>
</template>

<script>
import { MESSAGES } from '../../util/constants';
import PostInput from '../user-interfaces/PostInput.vue';
import SecondaryButton from '../user-interfaces/SecondaryButton.vue';
export default {
  name: 'PostCreator',
  data() {
    return {
      postInput: '',
    };
  },
  methods: {
    async onPostCreate() {
      const res = await this.$store.dispatch('auth/createPost', {
        content: this.postInput,
      });
      if (res.state) {
        this.postInput = '';
        this.$store.dispatch('toast/success', MESSAGES.POST_CREATE_SUCCESS);
      } else {
        this.$store.dispatch('toast/error', MESSAGES.POST_CREATE_FAILURE);
      }
    },
  },
  components: { PostInput, SecondaryButton },
};
</script>

<style scoped></style>
