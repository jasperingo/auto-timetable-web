<script setup lang="ts">
import type { Timetable } from "@/models/timetable-model";
import { computed } from "vue";
import BaseTableDataItem from "./BaseTableDataItem.vue";

const props = defineProps<{ item: Timetable }>();

const session = computed(
  () => `${props.item.session - 1}/${props.item.session}`
);

const href = computed(() => `/staff/timetable/${props.item.id}`);
</script>

<template>
  <BaseTableDataItem :text="item.id" />
  <BaseTableDataItem :text="session" />
  <BaseTableDataItem :text="item.semester" />
  <td class="border p-2">
    <RouterLink
      :to="href"
      class="block w-fit py-2 px-4 text-center text-white font-bold rounded-lg bg-green-700 hover:bg-green-500"
    >
      View
    </RouterLink>
  </td>
</template>
