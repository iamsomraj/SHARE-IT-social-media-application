<template>
  <div
    class="min-h-screen w-full pt-4 pb-16 text-slate-600 dark:bg-slate-800 dark:text-slate-200 md:py-8"
  >
    Post
  </div>
</template>

<script>
export default {
  name: 'PostPage',
  middleware: 'authenticated',
  async fetch() {
    const payload = { uuid: this.uuid, token: this.token };
    await this.$store.dispatch('post/fetchPost', payload);
  },
  computed: {
    token() {
      return this.$store.getters['auth/token'];
    },
    uuid() {
      return this.$route.params.uuid;
    },
    post() {
      return this.$store.getters['post/post'];
    },
  },
};
</script>
