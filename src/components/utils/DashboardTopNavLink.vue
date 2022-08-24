<script setup lang="ts">
defineProps<{
  href: string;
  text: string;
}>();

defineEmits(["linkClicked"]);
</script>

<template>
  <li>
    <RouterLink
      :to="href"
      @click="$emit('linkClicked')"
      class="block border-b py-2 px-4 text-left hover:text-green-700"
    >
      {{ text }}
    </RouterLink>
  </li>
</template>
