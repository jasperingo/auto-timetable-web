<script setup lang="ts">
import type { CourseRegistration } from "@/models/course-registration-model";
import BaseTableDataItem from "./BaseTableDataItem.vue";

defineProps<{ item: CourseRegistration }>();
</script>

<template>
  <BaseTableDataItem :text="item.id" />
  <BaseTableDataItem :text="`${item.session - 1}/${item.session}`" />
  <BaseTableDataItem :text="item.course.title" />
  <BaseTableDataItem :text="item.course.code" />
</template>
