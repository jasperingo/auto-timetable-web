<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="py-4">
    <h2 class="font-bold text-3xl">{{ text }}</h2>
  </div>
</template>
