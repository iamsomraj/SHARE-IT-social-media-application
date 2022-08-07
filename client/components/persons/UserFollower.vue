<template>
  <div class="flex items-center justify-center">
    <primary-button
      v-if="!doesUserFollow"
      @onClick="onUserFollow"
      :loading="loading"
    >
      Follow
    </primary-button>
    <secondary-button v-else @onClick="onUserUnfollow" :loading="loading"
      >Followed</secondary-button
    >
  </div>
</template>

<script>
import PrimaryButton from '../user-interfaces/PrimaryButton.vue';
import SecondaryButton from '../user-interfaces/SecondaryButton.vue';
import { MESSAGES } from '../../util/constants.js';
export default {
  name: 'UserFollower',
  data() {
    return {
      loading: false,
    };
  },
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
    async onUserFollow() {
      this.loading = true;
      const res = await this.this.$store.dispatch(
        'auth/follow',
        this.profile.uuid
      );
      this.loading = false;
      if (res.state) {
        this.$store.dispatch('toast/success', MESSAGES.PERSON_FOLLOW_SUCCESS);
        this.$store.dispatch('profile/getUserProfile', this.profile.uuid);
      } else {
        this.$store.dispatch('toast/error', MESSAGES.PERSON_FOLLOW_FAILURE);
      }
    },
    async onUserUnfollow() {
      this.loading = true;
      const res = await this.$store.dispatch(
        'auth/unfollow',
        this.profile.uuid
      );
      this.loading = false;
      if (res.state) {
        this.$store.dispatch('toast/success', MESSAGES.PERSON_UNFOLLOW_SUCCESS);
        this.$store.dispatch('profile/getUserProfile', this.profile.uuid);
      } else {
        this.$store.dispatch('toast/error', MESSAGES.PERSON_UNFOLLOW_FAILURE);
      }
    },
  },
  components: { PrimaryButton, SecondaryButton },
};
</script>

<style lang="scss" scoped></style>
