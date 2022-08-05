<template>
  <div class="flex w-full items-center justify-center py-4">
    <div class="flex w-2/3 justify-center space-x-2">
      <post-input
        placeholder="Speak your mind"
        v-model="postInput"
        @onEnter="onPostCreate"
      />
    </div>
  </div>
</template>

<script>
import PostInput from '../user-interfaces/PostInput.vue';
import SecondaryButton from '../user-interfaces/SecondaryButton.vue';
export default {
  name: 'PostCreator',
  data() {
    return {
      postInput: '',
    };
  },
  computed: {
    token() {
      return this.$store.getters['auth/token'];
    },
  },
  methods: {
    async onPostCreate() {
      const res = await this.$store.dispatch('post/create', {
        content: this.postInput,
        token: this.token,
      });
      if (res.state) {
        this.postInput = '';
        this.$store.dispatch('toast/success', 'Post created successfully');
      } else {
        this.$store.dispatch('toast/error', 'Post creation failed');
      }
    },
  },
  components: { PostInput, SecondaryButton },
};
</script>

<style scoped></style>
