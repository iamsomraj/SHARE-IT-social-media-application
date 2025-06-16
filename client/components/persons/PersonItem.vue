<template>
  <div
    class="flex w-full flex-col items-center justify-between space-y-2 rounded-none border px-6 py-4 dark:border-slate-600 md:flex-row md:space-y-0 md:rounded-xl"
  >
    <profile-picture
      :uuid="person.uuid"
      :name="person.name"
      class="h-12 w-12 text-7xl md:h-8 md:w-8 md:text-5xl"
    />
    <div
      @click="$router.push(`profile/${person.uuid}`)"
      class="cursor-pointer text-center text-xl font-bold text-slate-600 transition-all duration-300 hover:underline dark:text-slate-200 md:text-right"
    >
      {{ person.name }}
      <div class="text-xs font-light text-slate-400">
        {{ person.email }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Person {
    uuid: string
    name: string
    email: string
  }

  interface Props {
    person: Person
  }

  defineProps<Props>()
</script>

<style lang="scss" scoped></style>
