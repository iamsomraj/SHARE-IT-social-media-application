<template>
  <div class="flex w-full flex-col items-center justify-start">
    <div class="grid w-full grid-cols-12 gap-y-4 px-6 md:w-1/2">
      <profile-picture
        :uuid="uuid"
        :name="name"
        class="col-span-4 h-16 w-16 text-8xl"
      ></profile-picture>
      <profile-stats
        :numberOfPosts="numberOfPosts"
        :numberOfFollowers="numberOfFollowers"
        :numberOfFollowings="numberOfFollowings"
      ></profile-stats>
      <profile-detail
        class="col-span-4"
        :name="name"
        :email="email"
      ></profile-detail>
      <div v-if="!isSelf" class="col-span-2 md:hidden"></div>
      <user-follower v-if="!isSelf" class="col-span-6 md:col-span-8" />
    </div>
  </div>
</template>

<script>
import ProfileDetail from './ProfileDetail.vue';
import ProfileStats from './ProfileStats.vue';
import ProfilePicture from './ProfilePicture.vue';
import UserFollower from './UserFollower.vue';
export default {
  name: 'ProfileHeader',
  props: [
    'uuid',
    'id',
    'name',
    'email',
    'numberOfPosts',
    'numberOfFollowers',
    'numberOfFollowings',
  ],
  computed: {
    initialLetterOfName() {
      return this.name.charAt(0);
    },
    isSelf() {
      return this.uuid === this.$store.getters['auth/uuid'];
    },
  },
  components: { ProfilePicture, ProfileStats, ProfileDetail, UserFollower },
};
</script>

<style scoped></style>
