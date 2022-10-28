<script setup lang="ts">
import BaseSelect from "@/components/forms/BaseSelect.vue";
import BigLoader from "@/components/loaders/BigLoader.vue";
import ErrorLoader from "@/components/loaders/ErrorLoader.vue";
import BaseTable from "@/components/tables/BaseTable.vue";
import CourseToRegisterTableRow from "@/components/tables/CourseToRegisterTableRow.vue";
import ListFilter from "@/components/utils/ListFilter.vue";
import SubHeader from "@/components/utils/SubHeader.vue";
import { useCoursesRead } from "@/composables/courses/courses-read-composable";
import { useDepartmentsRead } from "@/composables/departments/departments-read-composable";
import { useCoursesSelectInputOptions } from "@/composables/utils/semesters-select-input-options-composable";
import { useDepartmentsSelectInputOptions } from "@/composables/utils/departments-select-input-options-composable";
import { useCourseRegistrationCreate } from "@/composables/course-registrations/course-registration-create-composable";
import { useCourseRegistrationDelete } from "@/composables/course-registrations/course-registration-delete-composable";
import { ref, computed, watch } from "vue";
import { useUserStore } from "@/stores/user";
import type { BaseSelectOptionType } from "@/models/base-select-option-type";
import { useToast } from "vue-toastification";
import type { WebserviceErrorResponse } from "@/models/web-service-error-response";

const HEAD_ITEMS = [
  "S/N",
  "Title",
  "Code",
  "Level",
  "Semester",
  "Department",
  "Action",
];

const courseId = ref(0);

const courseRegId = ref(0);

const semester = ref("");

const departmentId = ref("");

const level = ref("");

const toast = useToast();

const userStore = useUserStore();

const departmentsFetch = useDepartmentsRead();

const semesters = useCoursesSelectInputOptions();

const departments = useDepartmentsSelectInputOptions(departmentsFetch.data);

const { isLoading, isError, data, error, refetch } = useCoursesRead(
  departmentId,
  semester,
  level
);

const courseRegistrationCreate = useCourseRegistrationCreate();

const courseRegistrationDelete = useCourseRegistrationDelete();

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

watch(
  [courseRegistrationCreate.isSuccess, courseRegistrationCreate.isError],
  () => {
    if (courseRegistrationCreate.isError.value) {
      if (courseRegistrationCreate.error.value instanceof Error) {
        toast.error(courseRegistrationCreate.error.value.message);
      } else {
        const webError = courseRegistrationCreate.error
          .value as WebserviceErrorResponse;
        if (webError.status === 400) {
          toast.error(webError.errors[0].message);
        } else {
          toast.error(webError.error);
        }
      }
    }

    if (courseRegistrationCreate.isSuccess.value) {
      toast.success("Course registered");
      refetch.value();
    }
  }
);

watch(
  [courseRegistrationDelete.isSuccess, courseRegistrationDelete.isError],
  () => {
    if (courseRegistrationDelete.isError.value) {
      if (courseRegistrationDelete.error.value instanceof Error) {
        toast.error(courseRegistrationDelete.error.value.message);
      } else {
        const webError = courseRegistrationDelete.error
          .value as WebserviceErrorResponse;
        if (webError.status === 400) {
          toast.error(webError.errors[0].message);
        } else {
          toast.error(webError.error);
        }
      }
    }

    if (courseRegistrationDelete.isSuccess.value) {
      toast.success("Course unregistered");
      refetch.value();
    }
  }
);

const registerCourse = (id: number) => {
  courseId.value = id;
  courseRegistrationCreate.mutate({
    courseId: id,
    studentId: userStore.userId,
  });
};

const unregisterCourse = (id: number) => {
  courseRegId.value = id;
  courseRegistrationDelete.mutate(id);
};

const isCourseLoading = (id: number, regId: number) =>
  (courseRegistrationCreate.isLoading.value ||
    courseRegistrationDelete.isLoading.value) &&
  (id === courseId.value || regId === courseRegId.value);
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
            :loading="isCourseLoading(item.id, item.courseRegistrations[0]?.id)"
            @register-course="registerCourse"
            @unregister-course="unregisterCourse"
          />
        </BaseTable>
      </div>
    </div>
  </main>
</template>
