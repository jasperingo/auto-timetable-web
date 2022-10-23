<script setup lang="ts">
defineProps<{
  title: string;
  value?: number;
}>();
</script>

<template>
  <li class="w-1/2 p-2">
    <div class="shadow p-4 text-center rounded-lg">
      <div class="text-2xl font-bold text-green-700">{{ value }}</div>
      <div>{{ title }}</div>
    </div>
  </li>
</template>
