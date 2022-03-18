<template>
  <div>Profile Page</div>
</template>

<script>
import { getUserProfileById } from '../../helpers';
export default {
  name: 'ProfileIdPage',
  created() {
    /**
     * fetching user detail
     */
    const user = this.$store.getters['auth/getUser']();
    /**
     * when user is not logged in
     */
    if (!user) {
      console.log('redirect', user);
      this.$router.push('/');
    }
  },
  async fetch() {
    /**
     * fetching user detail
     */
    const user = this.$store.getters['auth/getUser']();
    const id = parseInt(this.$router.currentRoute.params.id); // getting id from url
    const fetchedProfile = await getUserProfileById(id, user.token);
    this.$store.commit('profile/setProfile', fetchedProfile);
  },
};
</script>

<style scoped></style>
