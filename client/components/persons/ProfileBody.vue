<template>
  <div class="w-full">
    <post-list
      :posts="posts"
      @onPostLike="onPostLike"
      @onPostUnlike="onPostUnlike"
    ></post-list>
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
    onPostLike(uuid) {
      this.$emit('onPostLike', uuid);
    },
    onPostUnlike(uuid) {
      this.$emit('onPostUnlike', uuid);
    },
    onUserFollow() {
      this.$emit('onUserFollow', this.profile.uuid);
    },
  },
  components: { PostList },
};
</script>

<style lang="scss" scoped></style>
