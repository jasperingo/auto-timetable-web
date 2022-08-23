<script setup lang="ts">
defineProps<{ text: string; loading?: boolean }>();
</script>

<template>
  <div class="mt-4">
    <button
      type="submit"
      class="block w-full font-bold bg-green-700 text-white rounded-lg p-2 hover:bg-green-500 disabled:bg-green-400"
    >
      <span v-if="!loading">{{ text }}</span>
      <div
        v-if="loading"
        class="animate-spin h-6 w-6 border-4 border-t-green-700 rounded-full mx-auto"
      ></div>
    </button>
  </div>
</template>
