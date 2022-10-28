<script setup lang="ts">
import BaseTableActionItem from "@/components/tables/BaseTableActionItem.vue";
import BaseTableDataItem from "./BaseTableDataItem.vue";
import type { Examination } from "@/models/examination-model";
import { computed } from "vue";

const props = defineProps<{ item: Examination }>();

const href = computed(() => `examinations/${props.item.id}`);
</script>

<template>
  <BaseTableDataItem :text="item.id" />
  <BaseTableDataItem :text="item.course.title" />
  <BaseTableDataItem :text="item.course.code" />
  <BaseTableDataItem :text="item.startAt" />
  <BaseTableDataItem :text="item.numberOfStudents" />
  <BaseTableDataItem :text="item.duration" />
  <BaseTableActionItem :href="href" />
</template>
