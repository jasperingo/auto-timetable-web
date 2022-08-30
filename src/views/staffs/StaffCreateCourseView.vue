<script setup lang="ts">
import SubHeader from "@/components/utils/SubHeader.vue";
import BaseButton from "@/components/forms/BaseButton.vue";
import BaseInput from "@/components/forms/BaseInput.vue";
import BaseSelect from "@/components/forms/BaseSelect.vue";
import DualInputBox from "@/components/forms/DualInputBox.vue";
import BigLoader from "@/components/loaders/BigLoader.vue";
import ErrorLoader from "@/components/loaders/ErrorLoader.vue";
import { useCourseCreate } from "@/composables/courses/course-create-composable";
import { useDepartmentsRead } from "@/composables/departments/departments-read-composable";
import { useDepartmentsSelectInputOptions } from "@/composables/utils/departments-select-input-options-composable";
import { Semester } from "@/models/semester-enum";
import type { WebserviceErrorResponse } from "@/models/web-service-error-response";
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { computed } from "@vue/reactivity";

const title = ref("");
const code = ref("");
const level = ref("");
const semester = ref("");
const departmentId = ref("");
const titleValidity = ref<ValidityState | null>(null);
const codeValidity = ref<ValidityState | null>(null);
const semesterValidity = ref<ValidityState | null>(null);
const levelValidity = ref<ValidityState | null>(null);
const departmentIdValidity = ref<ValidityState | null>(null);

const toast = useToast();

const router = useRouter();

const {
  isLoading: isDepartmentsLoading,
  isError: isDepartmentsError,
  data: departmentsData,
  error: departmentsError,
  refetch: refetchDepartments,
} = useDepartmentsRead();

const {
  validate,
  mutate,
  error,
  isError,
  isSuccess,
  isLoading,
  codeError,
  titleError,
  levelError,
  semesterError,
  departmentIdError,
} = useCourseCreate();

const departments = useDepartmentsSelectInputOptions(departmentsData);

const semesters = computed(() =>
  Object.values(Semester).map((k) => ({
    value: k,
    text: k,
  }))
);

watch([isSuccess, isError], () => {
  if (isError.value) {
    if (error.value instanceof Error) {
      toast.error(error.value.message);
    } else {
      const webError = error.value as WebserviceErrorResponse;
      if (webError.status === 400) {
        webError.errors.forEach((err) => {
          switch (err.name) {
            case "code":
              return (codeError.value = err.message);
            case "title":
              return (titleError.value = err.message);
            case "semester":
              return (semesterError.value = err.message);
            case "level":
              return (levelError.value = err.message);
            case "departmentId":
              return (departmentIdError.value = err.message);
          }
        });
      } else {
        toast.error(webError.error);
      }
    }
  }

  if (isSuccess.value) {
    toast.success("Course created");
    router.push({ name: "staff-read-courses" });
  }
});

const setTitleValidity = (state: ValidityState) => {
  titleValidity.value = state;
};

const setCodeValidity = (state: ValidityState) => {
  codeValidity.value = state;
};

const setSemesterValidity = (state: ValidityState) => {
  semesterValidity.value = state;
};

const setLevelValidity = (state: ValidityState) => {
  levelValidity.value = state;
};

const setDepartmentIdValidity = (state: ValidityState) => {
  departmentIdValidity.value = state;
};

const onSubmit = () => {
  if (
    validate(
      titleValidity.value,
      codeValidity.value,
      semesterValidity.value,
      levelValidity.value,
      departmentIdValidity.value
    )
  ) {
    mutate({
      code: code.value,
      title: title.value,
      level: Number(level.value),
      semester: semester.value,
      departmentId: Number(departmentId.value),
    });
  }
};
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Create course" />

      <BigLoader v-if="isDepartmentsLoading" />

      <ErrorLoader
        v-else-if="isDepartmentsError"
        :error="departmentsError"
        @retry="refetchDepartments"
      />

      <form v-else @submit.prevent="onSubmit" method="POST" class="base-form">
        <fieldset :disabled="isLoading">
          <DualInputBox>
            <template #left>
              <BaseInput
                label="Title"
                id="title-input"
                v-model="title"
                :error="titleError"
                @validity-change="setTitleValidity"
              />
            </template>

            <template #right>
              <BaseInput
                label="Code"
                id="code-input"
                v-model="code"
                :minlength="6"
                :maxlength="6"
                :error="codeError"
                @validity-change="setCodeValidity"
              />
            </template>
          </DualInputBox>

          <DualInputBox>
            <template #left>
              <BaseInput
                label="Level"
                id="level-input"
                type="number"
                :min="1"
                v-model="level"
                :error="levelError"
                @validity-change="setLevelValidity"
              />
            </template>

            <template #right>
              <BaseSelect
                label="Semester"
                id="semester-input"
                :options="semesters"
                v-model="semester"
                :error="semesterError"
                @validity-change="setSemesterValidity"
              />
            </template>
          </DualInputBox>

          <DualInputBox>
            <template #left>
              <BaseSelect
                label="Department"
                id="department-input"
                v-model="departmentId"
                :options="departments"
                :error="departmentIdError"
                @validity-change="setDepartmentIdValidity"
              />
            </template>
          </DualInputBox>

          <BaseButton text="Create" :loading="isLoading" />
        </fieldset>
      </form>
    </div>
  </main>
</template>
