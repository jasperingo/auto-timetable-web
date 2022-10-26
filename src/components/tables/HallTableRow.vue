<script setup lang="ts">
import type { Hall } from "@/models/hall-model";
import BaseTableDataItem from "./BaseTableDataItem.vue";

defineProps<{ item: Hall }>();
</script>

<template>
  <BaseTableDataItem :text="item.id" />
  <BaseTableDataItem :text="item.name ?? ''" />
  <BaseTableDataItem :text="item.capacity" />
  <BaseTableDataItem :text="item.department?.name ?? ''" />
</template>
