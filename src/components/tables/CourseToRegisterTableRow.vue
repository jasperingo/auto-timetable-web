<script setup lang="ts">
import BaseTableButtonItem from "@/components/tables/BaseTableButtonItem.vue";
import BaseTableDataItem from "./BaseTableDataItem.vue";
import type { Course } from "@/models/course-model";

const props = defineProps<{ item: Course }>();

const emit = defineEmits(["registerCourse", "unregisterCourse"]);

const onClick = () => {
  if (props.item.courseRegistrations.length === 0) {
    emit("registerCourse", props.item.id);
  } else {
    emit("unregisterCourse", props.item.courseRegistrations[0].id);
  }
};
</script>

<template>
  <BaseTableDataItem :text="item.id" />
  <BaseTableDataItem :text="item.title ?? ''" />
  <BaseTableDataItem :text="item.code" />
  <BaseTableDataItem :text="item.level" />
  <BaseTableDataItem :text="item.semester" />
  <BaseTableDataItem :text="item.department?.name ?? ''" />
  <BaseTableButtonItem
    @button-clicked="onClick"
    :text="item.courseRegistrations.length > 0 ? 'Unregister' : 'Register'"
    :positive="item.courseRegistrations.length === 0"
  />
</template>
