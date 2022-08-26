<script setup lang="ts">
import SubHeader from "@/components/utils/SubHeader.vue";
import { useDepartmentsRead } from "@/composables/departments/departments-read-composable";
import ErrorLoader from "../../components/loaders/ErrorLoader.vue";
import BigLoader from "../../components/loaders/BigLoader.vue";
import BaseTable from "../../components/tables/BaseTable.vue";
import DepartmentTableRow from "../../components/tables/DepartmentTableRow.vue";

const { isLoading, isError, data, error, refetch } = useDepartmentsRead();

const HEAD_ITEMS = ["S/N", "Name", "Code"];
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Departments" />

      <BigLoader v-if="isLoading" />

      <ErrorLoader v-else-if="isError" :error="error" @retry="refetch" />

      <BaseTable
        v-else
        :head-items="HEAD_ITEMS"
        :items="data?.data ?? []"
        v-slot="{ item }"
      >
        <DepartmentTableRow :item="item" />
      </BaseTable>
    </div>
  </main>
</template>
