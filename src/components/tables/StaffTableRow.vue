<script setup lang="ts">
import type { Staff } from "@/models/staff-model";
import BaseTableDataItem from "./BaseTableDataItem.vue";

defineProps<{ item: Staff }>();
</script>

<template>
  <BaseTableDataItem :text="item.id" />
  <BaseTableDataItem :text="item.title ?? ''" />
  <BaseTableDataItem :text="item.firstName" />
  <BaseTableDataItem :text="item.lastName" />
  <BaseTableDataItem :text="item.staffNumber" />
  <BaseTableDataItem :text="item.role" />
  <BaseTableDataItem :text="item.department?.name ?? ''" />
</template>
