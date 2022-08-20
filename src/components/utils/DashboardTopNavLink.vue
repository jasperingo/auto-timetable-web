<script setup lang="ts">
defineProps<{
  href: string;
  text: string;
}>();
</script>

<template>
  <li>
    <RouterLink
      :to="href"
      class="block border-b py-2 px-4 text-left hover:text-green-700"
    >
      {{ text }}
    </RouterLink>
  </li>
</template>
