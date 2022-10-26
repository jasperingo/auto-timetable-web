<script setup lang="ts">
import type { Course } from "@/models/course-model";
import BaseTableDataItem from "./BaseTableDataItem.vue";

defineProps<{ item: Course }>();
</script>

<template>
  <BaseTableDataItem :text="item.id" />
  <BaseTableDataItem :text="item.title ?? ''" />
  <BaseTableDataItem :text="item.code" />
  <BaseTableDataItem :text="item.level" />
  <BaseTableDataItem :text="item.semester" />
  <BaseTableDataItem :text="item.department?.name ?? ''" />
</template>
