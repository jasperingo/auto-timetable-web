<script setup lang="ts">
import BaseTableDataItem from "./BaseTableDataItem.vue";
import type { ExaminationHall } from "@/models/examination-hall-model";

defineProps<{ item: ExaminationHall }>();
</script>

<template>
  <BaseTableDataItem :text="item.id" />
  <BaseTableDataItem :text="item.capacity" />
  <BaseTableDataItem :text="item.hall.name" />
  <BaseTableDataItem :text="item.hall.department?.name ?? ''" />
</template>
