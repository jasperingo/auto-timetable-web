<script setup lang="ts">
import type { DashboardNavSubLinkType } from "@/models/dashboard-nav-link-type";
import { RouterLink } from "vue-router";

defineProps<{
  item: DashboardNavSubLinkType;
}>();

defineEmits(["linkClicked"]);
</script>

<template>
  <li>
    <RouterLink
      :to="item.href"
      @click="$emit('linkClicked')"
      class="block border-l-4 border-b border-l-green-700 py-1 px-2 hover:bg-green-200"
    >
      {{ item.text }}
    </RouterLink>
  </li>
</template>
