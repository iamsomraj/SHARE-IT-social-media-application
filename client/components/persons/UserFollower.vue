<template>
  <div class="flex items-center justify-center">
    <primary-button v-if="!doesUserFollow" @click="onUserFollow">
      Follow
    </primary-button>
    <secondary-button v-else>Followed</secondary-button>
  </div>
</template>

<script>
import PrimaryButton from '../user-interfaces/PrimaryButton.vue';
import SecondaryButton from '../user-interfaces/SecondaryButton.vue';
export default {
  name: 'UserFollower',
  computed: {
    profile() {
      return this.$store.getters['profile/profile'];
    },
    user() {
      return this.$store.getters['auth/user'];
    },
    followers() {
      return this.$store.getters['auth/followers'];
    },
    doesUserFollow() {
      return this.followers.some(
        (person) => person.followed_id === this.profile.id
      );
    },
  },
  methods: {
    onUserFollow() {
      this.$emit('onUserFollow');
    },
  },
  components: { PrimaryButton, SecondaryButton },
};
</script>

<style lang="scss" scoped></style>
