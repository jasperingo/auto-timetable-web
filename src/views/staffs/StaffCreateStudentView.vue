<script setup lang="ts">
import SubHeader from "@/components/utils/SubHeader.vue";
import BigLoader from "@/components/loaders/BigLoader.vue";
import ErrorLoader from "@/components/loaders/ErrorLoader.vue";
import DualInputBox from "@/components/forms/DualInputBox.vue";
import BaseInput from "@/components/forms/BaseInput.vue";
import BaseButton from "@/components/forms/BaseButton.vue";
import BaseSelect from "@/components/forms/BaseSelect.vue";
import { useStudentCreate } from "@/composables/students/student-create-composable";
import { useDepartmentsRead } from "@/composables/departments/departments-read-composable";
import { useDepartmentsSelectInputOptions } from "@/composables/utils/departments-select-input-options-composable";
import type { WebserviceErrorResponse } from "@/models/web-service-error-response";
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const firstName = ref("");
const lastName = ref("");
const matriculationNumber = ref("");
const password = ref("");
const joinedAt = ref("");
const departmentId = ref("");
const firstNameValidity = ref<ValidityState | null>(null);
const lastNameValidity = ref<ValidityState | null>(null);
const matriculationNumberValidity = ref<ValidityState | null>(null);
const passwordValidity = ref<ValidityState | null>(null);
const joinedAtValidity = ref<ValidityState | null>(null);
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

const departments = useDepartmentsSelectInputOptions(departmentsData);

const {
  mutate,
  validate,
  error,
  isError,
  isSuccess,
  isLoading,
  joinedAtError,
  lastNameError,
  passwordError,
  firstNameError,
  departmentIdError,
  matriculationNumberError,
} = useStudentCreate();

watch([isSuccess, isError], () => {
  if (isError.value) {
    if (error.value instanceof Error) {
      toast.error(error.value.message);
    } else {
      const webError = error.value as WebserviceErrorResponse;
      if (webError.status === 400) {
        webError.errors.forEach((err) => {
          switch (err.name) {
            case "firstName":
              return (firstNameError.value = err.message);
            case "lastName":
              return (lastNameError.value = err.message);
            case "matriculationNumber":
              return (matriculationNumberError.value = err.message);
            case "password":
              return (passwordError.value = err.message);
            case "joinedAt":
              return (joinedAtError.value = err.message);
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
    toast.success("Student created");
    router.push({ name: "staff-read-students" });
  }
});

const setFirstNameValidity = (state: ValidityState) => {
  firstNameValidity.value = state;
};

const setLastNameValidity = (state: ValidityState) => {
  lastNameValidity.value = state;
};

const setMatriculationNumberValidity = (state: ValidityState) => {
  matriculationNumberValidity.value = state;
};

const setPasswordValidity = (state: ValidityState) => {
  passwordValidity.value = state;
};

const setJoinedAtValidity = (state: ValidityState) => {
  joinedAtValidity.value = state;
};

const setDepartmentIdValidity = (state: ValidityState) => {
  departmentIdValidity.value = state;
};

const onSubmit = () => {
  if (
    validate(
      firstNameValidity.value,
      lastNameValidity.value,
      matriculationNumberValidity.value,
      passwordValidity.value,
      joinedAtValidity.value,
      departmentIdValidity.value
    )
  ) {
    mutate({
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
      matriculationNumber: matriculationNumber.value,
      joinedAt: Number(joinedAt.value),
      departmentId: Number(departmentId.value),
    });
  }
};
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Create student" />

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
                label="First name"
                id="first-name-input"
                v-model="firstName"
                :error="firstNameError"
                @validity-change="setFirstNameValidity"
              />
            </template>

            <template #right>
              <BaseInput
                label="Last name"
                id="last-name-input"
                v-model="lastName"
                :error="lastNameError"
                @validity-change="setLastNameValidity"
              />
            </template>
          </DualInputBox>

          <DualInputBox>
            <template #left>
              <BaseInput
                label="Matriculation number"
                id="matriculation-number-input"
                v-model="matriculationNumber"
                :minlength="11"
                :maxlength="11"
                :error="matriculationNumberError"
                @validity-change="setMatriculationNumberValidity"
              />
            </template>

            <template #right>
              <BaseInput
                label="Password"
                id="password-input"
                type="password"
                :minlength="6"
                v-model="password"
                :error="passwordError"
                @validity-change="setPasswordValidity"
              />
            </template>
          </DualInputBox>

          <DualInputBox>
            <template #left>
              <BaseInput
                label="Enrollment year"
                id="joined-at-input"
                type="number"
                :min="1960"
                v-model="joinedAt"
                :error="joinedAtError"
                @validity-change="setJoinedAtValidity"
              />
            </template>

            <template #right>
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
