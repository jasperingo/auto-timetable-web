<script setup lang="ts">
import BigLoader from "@/components/loaders/BigLoader.vue";
import ErrorLoader from "@/components/loaders/ErrorLoader.vue";
import BaseTable from "@/components/tables/BaseTable.vue";
import StaffTableRow from "@/components/tables/StaffTableRow.vue";
import SubHeader from "@/components/utils/SubHeader.vue";
import { useStaffsRead } from "@/composables/staffs/staffs-read-composable";

const { isLoading, isError, data, error, refetch } = useStaffsRead();

const HEAD_ITEMS = [
  "S/N",
  "Title",
  "First name",
  "Last name",
  "Staff number",
  "Role",
  "Department",
];
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Staffs" />

      <BigLoader v-if="isLoading" />

      <ErrorLoader v-else-if="isError" :error="error" @retry="refetch" />

      <BaseTable
        v-else
        :head-items="HEAD_ITEMS"
        :items="data?.data ?? []"
        v-slot="{ item }"
      >
        <StaffTableRow :item="item" />
      </BaseTable>
    </div>
  </main>
</template>
