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
      @click="handlePersonClick"
      :class="[
        'cursor-pointer text-center text-xl font-bold text-slate-600 transition-all duration-300 hover:underline dark:text-slate-200 md:text-right',
        { 'cursor-default': !clickable },
      ]"
    >
      {{ person.name }}
      <div v-if="showEmail" class="text-xs font-light text-slate-400">
        {{ person.email }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { User } from '~/types/auth'

  // Component props with better typing
  interface Props {
    person: User
    showEmail?: boolean
    compact?: boolean
    clickable?: boolean
  }

  // Define props with defaults
  const props = withDefaults(defineProps<Props>(), {
    showEmail: true,
    compact: false,
    clickable: true,
  })

  // Component emits
  interface Emits {
    onPersonClick: [person: User]
    onProfileView: [uuid: string]
  }

  const emit = defineEmits<Emits>()

  // Router for navigation
  const router = useRouter()

  // Handle person click
  const handlePersonClick = (): void => {
    if (props.clickable) {
      emit('onPersonClick', props.person)
      emit('onProfileView', props.person.uuid)
      router.push(`/profile/${props.person.uuid}`)
    }
  }
</script>

<style lang="scss" scoped></style>
