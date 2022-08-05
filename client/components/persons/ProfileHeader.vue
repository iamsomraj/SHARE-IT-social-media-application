<template>
  <div
    class="flex w-full items-center justify-between space-x-0 px-6 text-sm md:w-1/2 md:space-x-2 md:px-0"
  >
    <div>
      <profile-picture
        :uuid="uuid"
        :name="name"
        class="h-16 w-16 text-8xl"
      ></profile-picture>
    </div>
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
