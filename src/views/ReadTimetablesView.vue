<script setup lang="ts">
import BigLoader from "@/components/loaders/BigLoader.vue";
import ErrorLoader from "@/components/loaders/ErrorLoader.vue";
import BaseTable from "@/components/tables/BaseTable.vue";
import TimetableTableRow from "@/components/tables/TimetableTableRow.vue";
import SubHeader from "@/components/utils/SubHeader.vue";
import { useTimetablesRead } from "@/composables/timetables/timetables-read-composable";

const HEAD_ITEMS = ["S/N", "Session", "Semester", "Action"];

const { isLoading, isError, data, error, refetch } = useTimetablesRead();
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Timetables" />

      <BigLoader v-if="isLoading" />

      <ErrorLoader v-else-if="isError" :error="error" @retry="refetch" />

      <div v-else>
        <BaseTable
          :head-items="HEAD_ITEMS"
          :items="data?.data ?? []"
          v-slot="{ item }"
        >
          <TimetableTableRow :item="item" />
        </BaseTable>
      </div>
    </div>
  </main>
</template>
