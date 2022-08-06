<template>
  <div class="my-2 flex flex-col items-start justify-center space-y-2">
    <div class="text-left text-xl font-extrabold capitalize">
      {{ name }}
    </div>
    <div class="text-left text-xs text-gray-400">
      {{ email }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileName',
  props: ['name', 'email'],
};
</script>
