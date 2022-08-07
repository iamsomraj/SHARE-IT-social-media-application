<template>
  <div class="mt-4 mb-16 w-full md:my-6">
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
