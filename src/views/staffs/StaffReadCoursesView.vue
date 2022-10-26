<script setup lang="ts">
import BaseSelect from "@/components/forms/BaseSelect.vue";
import BigLoader from "@/components/loaders/BigLoader.vue";
import ErrorLoader from "@/components/loaders/ErrorLoader.vue";
import BaseTable from "@/components/tables/BaseTable.vue";
import CourseTableRow from "@/components/tables/CourseTableRow.vue";
import ListFilter from "@/components/utils/ListFilter.vue";
import SubHeader from "@/components/utils/SubHeader.vue";
import { useCoursesRead } from "@/composables/courses/courses-read-composable";
import { useDepartmentsRead } from "@/composables/departments/departments-read-composable";
import { useCoursesSelectInputOptions } from "@/composables/utils/semesters-select-input-options-composable";
import { useDepartmentsSelectInputOptions } from "@/composables/utils/departments-select-input-options-composable";
import { ref, computed } from "vue";

const HEAD_ITEMS = ["S/N", "Title", "Code", "Level", "Semester", "Department"];

const semester = ref("");

const departmentId = ref("");

const departmentsFetch = useDepartmentsRead();

const semesters = useCoursesSelectInputOptions();

const departments = useDepartmentsSelectInputOptions(departmentsFetch.data);

const { isLoading, isError, data, error, refetch } = useCoursesRead(
  departmentId,
  semester
);

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
      <SubHeader text="Courses" />

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
            label="Semester"
            id="semester-input"
            :options="semesters"
            v-model="semester"
          />
        </ListFilter>

        <BaseTable
          :head-items="HEAD_ITEMS"
          :items="data?.data ?? []"
          v-slot="{ item }"
        >
          <CourseTableRow :item="item" />
        </BaseTable>
      </div>
    </div>
  </main>
</template>
