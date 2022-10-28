<script setup lang="ts">
import BaseTableActionItem from "@/components/tables/BaseTableActionItem.vue";
import type { Timetable } from "@/models/timetable-model";
import { computed } from "vue";
import BaseTableDataItem from "./BaseTableDataItem.vue";

const props = defineProps<{ item: Timetable }>();

const session = computed(
  () => `${props.item.session - 1}/${props.item.session}`
);

const href = computed(() => `timetables/${props.item.id}`);
</script>

<template>
  <BaseTableDataItem :text="item.id" />
  <BaseTableDataItem :text="session" />
  <BaseTableDataItem :text="item.semester" />
  <BaseTableActionItem :href="href" />
</template>
