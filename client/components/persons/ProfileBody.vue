<template>
  <div class="w-full">
    <PostList :posts="posts" @onPostLike="onPostLike" />
  </div>
</template>

<script>
import PostList from './../posts/PostList.vue';

export default {
  name: 'ProfileBody',
  props: ['posts', 'name'],
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
    profile() {
      return this.$store.getters['profile/profile'];
    },
    doesUserFollow() {
      const followers = this.user.followers;
      return followers.some((person) => person.followed_id === this.profile.id);
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
      this.$emit('onUserFollow', this.profile.uuid);
    },
  },
  components: { PostList },
};
</script>

<style lang="scss" scoped></style>
