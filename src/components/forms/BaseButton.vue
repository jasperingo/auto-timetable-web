<script setup lang="ts">
import SmallLoader from "@/components/loaders/SmallLoader.vue";

defineProps<{ text: string; loading?: boolean }>();
</script>

<template>
  <div class="mt-4">
    <button
      type="submit"
      class="block w-full font-bold bg-green-700 text-white rounded-lg p-2 hover:bg-green-500 disabled:bg-green-400"
    >
      <span v-if="!loading">{{ text }}</span>
      <SmallLoader v-if="loading" />
    </button>
  </div>
</template>
