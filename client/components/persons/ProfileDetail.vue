<template>
  <div class="flex flex-col items-start justify-center space-y-2">
    <div class="text-left text-xl font-extrabold capitalize text-slate-600">
      {{ name }}
    </div>
    <div class="text-left text-xs font-light text-slate-400">
      {{ email }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileDetail',
  props: ['name', 'email'],
};
</script>
