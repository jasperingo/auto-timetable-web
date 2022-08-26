<script setup lang="ts">
import type { Department } from "@/models/department-model";
import BaseTableDataItem from "./BaseTableDataItem.vue";

defineProps<{ item: Department }>();
</script>

<template>
  <BaseTableDataItem :text="item.id" />
  <BaseTableDataItem :text="item.name" />
  <BaseTableDataItem :text="item.code" />
</template>
