<template>
  <div class="w-full pt-4 pb-16 dark:bg-slate-800 md:py-8">
    <self-profile v-if="isLoggedInUserProfile"></self-profile>
    <other-profile v-else></other-profile>
  </div>
</template>

<script>
import SelfProfile from '../../components/persons/SelfProfile.vue';
import OtherProfile from '../../components/persons/OtherProfile.vue';

export default {
  name: 'ProfilePage',
  middleware: 'authenticated',
  computed: {
    isLoggedInUserProfile() {
      return this.$store.getters['auth/uuid'] === this.$route.params.uuid;
    },
  },
  components: {
    OtherProfile,
    SelfProfile,
  },
};
</script>
