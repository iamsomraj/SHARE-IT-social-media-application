<template>
  <div
    class="flex w-full flex-col items-center justify-between space-y-2 rounded-none border px-6 py-4 md:flex-row md:space-y-0 md:rounded-xl"
  >
    <profile-picture
      :uuid="person.uuid"
      :name="person.name"
      class="h-12 w-12 text-7xl md:h-8 md:w-8 md:text-5xl"
    ></profile-picture>
    <div
      @click="$router.push(`profile/${person.uuid}`)"
      class="cursor-pointer text-center text-xl font-bold text-slate-600 transition-all duration-300 hover:underline md:text-right"
    >
      {{ person.name }}
      <div class="text-xs font-light text-slate-400">
        {{ person.email }}
      </div>
    </div>
  </div>
</template>

<script>
import ProfileDetail from './ProfileDetail.vue';
import ProfilePicture from './ProfilePicture.vue';
export default {
  name: 'PersonItem',
  props: ['person'],
  components: { ProfileDetail, ProfilePicture },
};
</script>

<style lang="scss" scoped></style>
