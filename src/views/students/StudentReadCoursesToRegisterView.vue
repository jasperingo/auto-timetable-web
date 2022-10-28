<script setup lang="ts">
import BaseSelect from "@/components/forms/BaseSelect.vue";
import BigLoader from "@/components/loaders/BigLoader.vue";
import ErrorLoader from "@/components/loaders/ErrorLoader.vue";
import BaseTable from "@/components/tables/BaseTable.vue";
import CourseToRegisterTableRow from "@/components/tables/CourseToRegisterTableRow.vue";
import ListFilter from "@/components/utils/ListFilter.vue";
import SubHeader from "@/components/utils/SubHeader.vue";
import { useCoursesToRegisterRead } from "@/composables/courses/courses-to-register-read-composable";
import { useDepartmentsRead } from "@/composables/departments/departments-read-composable";
import { useCoursesSelectInputOptions } from "@/composables/utils/semesters-select-input-options-composable";
import { useDepartmentsSelectInputOptions } from "@/composables/utils/departments-select-input-options-composable";
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import type { BaseSelectOptionType } from "@/models/base-select-option-type";

const HEAD_ITEMS = [
  "S/N",
  "Title",
  "Code",
  "Level",
  "Semester",
  "Department",
  "Action",
];

const semester = ref("");

const departmentId = ref("");

const level = ref("");

const userStore = useUserStore();

const departmentsFetch = useDepartmentsRead();

const semesters = useCoursesSelectInputOptions();

const departments = useDepartmentsSelectInputOptions(departmentsFetch.data);

const { isLoading, isError, data, error, refetch } = useCoursesToRegisterRead(
  departmentId,
  semester,
  level
);

const levels = computed(() => {
  const studentLevel =
    new Date().getFullYear() - (userStore.student?.joinedAt ?? 0) + 1;

  const levelOptions: BaseSelectOptionType[] = [];

  for (let i = studentLevel; i > 0; i--) {
    levelOptions.push({
      text: String(i),
      value: i,
    });
  }

  return levelOptions;
});

const isLoadingAll = computed(
  () => departmentsFetch.isLoading.value || isLoading.value
);

const isErrorAll = computed(
  () => departmentsFetch.isError.value || isError.value
);

const errorAll = computed(() => departmentsFetch.error.value ?? error.value);

const registerCourse = (id: number) => {
  console.log("Register course: ", id);
};

const unregisterCourse = (id: number) => {
  console.log("Unegister course: ", id);
};
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Courses to register" />

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
          <BaseSelect
            label="Level"
            id="level-input"
            :options="levels"
            v-model="level"
          />
        </ListFilter>

        <BaseTable
          :head-items="HEAD_ITEMS"
          :items="data?.data ?? []"
          v-slot="{ item }"
        >
          <CourseToRegisterTableRow
            :item="item"
            @register-course="registerCourse"
            @unregister-course="unregisterCourse"
          />
        </BaseTable>
      </div>
    </div>
  </main>
</template>
