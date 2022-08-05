<template>
  <div
    class="flex w-full items-center justify-center space-x-2 text-sm md:w-1/2"
  >
    <profile-picture
      :uuid="uuid"
      :name="name"
      class="h-16 w-16 text-8xl"
    ></profile-picture>
    <profile-stats
      :numberOfPosts="numberOfPosts"
      :numberOfFollowers="numberOfFollowers"
      :numberOfFollowings="numberOfFollowings"
    ></profile-stats>
  </div>
</template>

<script>
import ProfilePicture from './ProfilePicture.vue';
import ProfileStats from './ProfileStats.vue';
export default {
  name: 'ProfileHeader',
  props: [
    'uuid',
    'id',
    'name',
    'numberOfPosts',
    'numberOfFollowers',
    'numberOfFollowings',
  ],
  computed: {
    initialLetterOfName() {
      return this.name.charAt(0);
    },
  },
  components: { ProfilePicture, ProfileStats },
};
</script>

<style scoped></style>
