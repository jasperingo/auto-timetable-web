<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
}>();
</script>

<template>
  <div class="border-b-2 p-1 mb-4 lg:mb-8 lg:flex lg:gap-x-2 lg:items-center">
    <dt class="text-green-700 font-bold text-sm lg:text-lg">{{ title }}:</dt>
    <dd class="lg:text-lg">{{ value }}</dd>
  </div>
</template>
