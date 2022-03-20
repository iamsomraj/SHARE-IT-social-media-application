<template>
  <div class="my-2">
    <PostCreator v-if="user.id === profile.id" @onPostCreate="onPostCreate" />
    <UserFollower v-if="user.id !== profile.id" @onUserFollow="onUserFollow" />
    <PostList :posts="posts" @onPostLike="onPostLike" />
  </div>
</template>

<script>
export default {
  name: 'ProfileBody',
  props: ['posts', 'name'],
  computed: {
    user() {
      return this.$store.getters['auth/getUser']();
    },
    profile() {
      return this.$store.getters['profile/getProfile']();
    },
  },
  methods: {
    onPostCreate(postInput) {
      this.$emit('onPostCreate', postInput);
    },
    onPostLike(id) {
      this.$emit('onPostLike', id);
    },
    onUserFollow() {
      alert('Follow clicked');
    },
  },
};
</script>

<style lang="scss" scoped></style>
