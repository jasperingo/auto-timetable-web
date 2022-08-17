<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps<{ text: string; href: string }>();
</script>

<template>
  <li>
    <RouterLink
      :to="href"
      class="block text-white bg-green-700 p-4 rounded-lg font-bold hover:bg-green-500"
    >
      {{ text }}
    </RouterLink>
  </li>
</template>
