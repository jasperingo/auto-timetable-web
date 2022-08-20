<script setup lang="ts">
import type { DashboardNavLinkType } from "@/models/dashboard-nav-link-type";
import { ref } from "vue";
import DownIcon from "vue-material-design-icons/ChevronDown.vue";
import RightIcon from "vue-material-design-icons/ChevronRight.vue";
import DashboardNavSubLink from "./DashboardNavSubLink.vue";

defineProps<{
  item: DashboardNavLinkType;
}>();

const showSubLinks = ref(false);

const toggleSubLinks = () => (showSubLinks.value = !showSubLinks.value);
</script>

<template>
  <li class="px-2 mb-4">
    <button
      @click="toggleSubLinks"
      class="w-full flex items-center text-left font-bold p-4 shadow rounded-lg hover:shadow-green-700"
    >
      <span class="flex-grow">{{ item.text }}</span>
      <RightIcon v-if="!showSubLinks" />
      <DownIcon v-if="showSubLinks" />
    </button>
    <ul :class="{ hidden: !showSubLinks }" class="border my-2">
      <DashboardNavSubLink
        v-for="subItem in item.subLinks"
        :key="subItem.text"
        :item="subItem"
      />
    </ul>
  </li>
</template>
