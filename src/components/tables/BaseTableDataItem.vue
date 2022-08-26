<script setup lang="ts">
defineProps<{ text: string | number }>();
</script>

<template>
  <td class="border p-2">{{ text }}</td>
</template>
