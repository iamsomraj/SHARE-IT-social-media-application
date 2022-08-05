<template>
  <div>
    <div
      v-for="person in people"
      :key="person.key"
      class="flex justify-center items-center"
    >
      <PersonItem :person="person" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExploreMain',
  props: ['people'],
};
</script>

<style lang="scss" scoped></style>
