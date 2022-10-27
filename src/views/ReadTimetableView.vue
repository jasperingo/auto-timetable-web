<script setup lang="ts">
import BaseSelect from "@/components/forms/BaseSelect.vue";
import BigLoader from "@/components/loaders/BigLoader.vue";
import ErrorLoader from "@/components/loaders/ErrorLoader.vue";
import BaseTable from "@/components/tables/BaseTable.vue";
import ExaminationTableRow from "@/components/tables/ExaminationTableRow.vue";
import ListFilter from "@/components/utils/ListFilter.vue";
import SubHeader from "@/components/utils/SubHeader.vue";
import { useTimetableRead } from "@/composables/timetables/timetable-read-composable";
import { useExaminationFiltersSelectInputOptions } from "@/composables/utils/examination-filters-select-input-options-composable";
import { ref } from "vue";
import { useRoute } from "vue-router";

const HEAD_ITEMS = [
  "S/N",
  "Course title",
  "Course code",
  "Start date",
  "Number of students",
  "Duration (Hours)",
  "Action",
];

const filter = ref("");

const filters = useExaminationFiltersSelectInputOptions();

const route = useRoute();

const { isLoading, isError, data, error, refetch } = useTimetableRead(
  route.params.id[0],
  filter
);
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Timetable" />

      <BigLoader v-if="isLoading" />

      <ErrorLoader v-else-if="isError" :error="error" @retry="refetch" />

      <div v-else>
        <div class="shadow p-4 rounded-lg text-xl mb-4">
          Timetable for the {{ data?.data.semester }} semester of
          {{ (data?.data.session ?? 0) - 1 }}/{{ data?.data.session }} academic
          session
        </div>

        <ListFilter>
          <BaseSelect
            label="Filter"
            id="filter-input"
            :options="filters"
            v-model="filter"
          />
        </ListFilter>

        <BaseTable
          :head-items="HEAD_ITEMS"
          :items="data?.data.examinations ?? []"
          v-slot="{ item }"
        >
          <ExaminationTableRow :item="item" />
        </BaseTable>
      </div>
    </div>
  </main>
</template>
