<script setup lang="ts">
import BaseSelect from "@/components/forms/BaseSelect.vue";
import BigLoader from "@/components/loaders/BigLoader.vue";
import ErrorLoader from "@/components/loaders/ErrorLoader.vue";
import BaseTable from "@/components/tables/BaseTable.vue";
import StudentTableRow from "@/components/tables/StudentTableRow.vue";
import ListFilter from "@/components/utils/ListFilter.vue";
import SubHeader from "@/components/utils/SubHeader.vue";
import { useDepartmentsRead } from "@/composables/departments/departments-read-composable";
import { useStudentsRead } from "@/composables/students/students-read-composable";
import { useDepartmentsSelectInputOptions } from "@/composables/utils/departments-select-input-options-composable";
import { computed, ref } from "vue";

const HEAD_ITEMS = [
  "S/N",
  "First name",
  "Last name",
  "Matriculation number",
  "Session",
  "Department",
];

const session = ref("");

const departmentId = ref("");

const departmentsFetch = useDepartmentsRead();

const departments = useDepartmentsSelectInputOptions(departmentsFetch.data);

const { isLoading, isError, data, error, refetch } = useStudentsRead(
  departmentId,
  session
);

const sessions = computed(() => {
  const year = new Date().getFullYear();

  const options: { text: string; value: number }[] = [];

  for (let i = year; i > 2000; i--) {
    options.push({ text: `${i - 1}/${i}`, value: i });
  }

  return options;
});

const isLoadingAll = computed(
  () => departmentsFetch.isLoading.value || isLoading.value
);

const isErrorAll = computed(
  () => departmentsFetch.isError.value || isError.value
);

const errorAll = computed(() => departmentsFetch.error.value ?? error.value);
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Students" />

      <BigLoader v-if="isLoadingAll" />

      <ErrorLoader v-else-if="isErrorAll" :error="errorAll" @retry="refetch" />

      <div v-else>
        <ListFilter>
          <BaseSelect
            label="Department"
            id="department-input"
            :options="departments"
            v-model="departmentId"
          />
          <BaseSelect
            label="Session"
            id="session-input"
            :options="sessions"
            v-model="session"
          />
        </ListFilter>

        <BaseTable
          :head-items="HEAD_ITEMS"
          :items="data?.data ?? []"
          v-slot="{ item }"
        >
          <StudentTableRow :item="item" />
        </BaseTable>
      </div>
    </div>
  </main>
</template>
