<script setup lang="ts">
withDefaults(defineProps<{ text?: string | number; href: string }>(), {
  text: "View",
});
</script>

<template>
  <td class="border p-2">
    <RouterLink
      :to="href"
      class="block w-fit py-2 px-4 text-center text-white font-bold rounded-lg bg-green-700 hover:bg-green-500"
    >
      {{ text }}
    </RouterLink>
  </td>
</template>
