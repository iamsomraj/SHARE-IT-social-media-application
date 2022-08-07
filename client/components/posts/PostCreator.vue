<template>
  <div class="flex w-full items-center justify-center py-4">
    <div class="mx-6 flex w-full justify-center space-x-2 md:mx-0 md:w-1/2">
      <post-input
        placeholder="Speak your mind"
        :loading="loading"
        v-model="postInput"
        @onEnter="onPostCreate"
      />
    </div>
  </div>
</template>

<script>
import { MESSAGES } from '../../util/constants';
import PostInput from '../posts/PostInput.vue';
import SecondaryButton from '../user-interfaces/SecondaryButton.vue';
export default {
  name: 'PostCreator',
  data() {
    return {
      postInput: '',
      loading: false,
    };
  },
  methods: {
    async onPostCreate() {
      this.loading = true;
      const content = this.postInput;
      this.postInput = '';
      const res = await this.$store.dispatch('auth/createPost', {
        content,
      });
      this.loading = false;
      if (res.state) {
        this.$store.dispatch('toast/success', MESSAGES.POST_CREATE_SUCCESS);
      } else {
        this.postInput = content;
        this.$store.dispatch('toast/error', MESSAGES.POST_CREATE_FAILURE);
      }
    },
  },
  components: { PostInput, SecondaryButton },
};
</script>

<style scoped></style>
