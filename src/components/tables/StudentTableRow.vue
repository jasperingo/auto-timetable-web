<script setup lang="ts">
import type { Student } from "@/models/student-model";
import BaseTableDataItem from "./BaseTableDataItem.vue";

defineProps<{ item: Student }>();
</script>

<template>
  <BaseTableDataItem :text="item.id" />
  <BaseTableDataItem :text="item.firstName" />
  <BaseTableDataItem :text="item.lastName" />
  <BaseTableDataItem :text="item.matriculationNumber" />
  <BaseTableDataItem :text="`${item.joinedAt - 1}/${item.joinedAt}`" />
  <BaseTableDataItem :text="item.department?.name ?? ''" />
</template>
