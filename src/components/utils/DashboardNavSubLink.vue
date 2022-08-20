<script setup lang="ts">
import type { DashboardNavSubLinkType } from "@/models/dashboard-nav-link-type";
import { RouterLink } from "vue-router";

defineProps<{
  item: DashboardNavSubLinkType;
}>();
</script>

<template>
  <li>
    <RouterLink
      :to="item.href"
      class="block border-l-4 border-b border-l-green-700 p-1 hover:bg-green-200"
    >
      {{ item.text }}
    </RouterLink>
  </li>
</template>
