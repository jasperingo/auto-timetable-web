<script setup lang="ts">
import BaseSelect from "@/components/forms/BaseSelect.vue";
import BigLoader from "@/components/loaders/BigLoader.vue";
import ErrorLoader from "@/components/loaders/ErrorLoader.vue";
import BaseTable from "@/components/tables/BaseTable.vue";
import ListFilter from "@/components/utils/ListFilter.vue";
import SubHeader from "@/components/utils/SubHeader.vue";
import { useSemestersSelectInputOptions } from "@/composables/utils/semesters-select-input-options-composable";
import { useCourseRegistrationsRead } from "@/composables/course-registrations/course-registrations-read-composable";
import { useSessionsSelectInputOptions } from "@/composables/utils/sessions-select-input-options-composable";
import { ref } from "vue";
import CourseRegistrationTableRow from "@/components/tables/CourseRegistrationTableRow.vue";

const HEAD_ITEMS = ["S/N", "Session", "Course title", "Course code"];

const semester = ref("");

const session = ref("");

const semesters = useSemestersSelectInputOptions();

const sessions = useSessionsSelectInputOptions();

const { isLoading, isError, data, error, refetch } = useCourseRegistrationsRead(
  semester,
  session
);
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Course registrations" />

      <BigLoader v-if="isLoading" />

      <ErrorLoader v-else-if="isError" :error="error" @retry="refetch" />

      <div v-else>
        <ListFilter>
          <BaseSelect
            label="Semester"
            id="semester-input"
            :options="semesters"
            v-model="semester"
          />
          <BaseSelect
            label="Session"
            id="sessions-input"
            :options="sessions"
            v-model="session"
          />
        </ListFilter>

        <BaseTable
          :head-items="HEAD_ITEMS"
          :items="data?.data ?? []"
          v-slot="{ item }"
        >
          <CourseRegistrationTableRow :item="item" />
        </BaseTable>
      </div>
    </div>
  </main>
</template>
