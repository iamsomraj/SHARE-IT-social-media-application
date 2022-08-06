<template>
  <div class="flex w-full flex-col items-center justify-start">
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
    <div
      class="flex w-full items-center justify-start space-x-0 px-6 text-sm md:w-1/2 md:space-x-2 md:px-0"
    >
      <profile-name :name="name" :email="email"></profile-name>
    </div>
  </div>
</template>

<script>
import ProfilePicture from './ProfilePicture.vue';
import ProfileStats from './ProfileStats.vue';
import ProfileName from './ProfileName.vue';
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
  },
  components: { ProfilePicture, ProfileStats, ProfileName },
};
</script>

<style scoped></style>
