<script setup lang="ts">
import BaseTableDataItem from "./BaseTableDataItem.vue";
import type { ExaminationInvigilator } from "@/models/examination-invigilator-model";

defineProps<{ item: ExaminationInvigilator }>();
</script>

<template>
  <BaseTableDataItem :text="item.id" />
  <BaseTableDataItem :text="item.staff.title ?? ''" />
  <BaseTableDataItem :text="item.staff.firstName" />
  <BaseTableDataItem :text="item.staff.lastName" />
  <BaseTableDataItem :text="item.staff.department?.name ?? ''" />
</template>
