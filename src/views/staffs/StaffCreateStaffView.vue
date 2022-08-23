<script setup lang="ts">
import SubHeader from "@/components/utils/SubHeader.vue";
import BaseInput from "@/components/forms/BaseInput.vue";
import { computed, ref, watch } from "vue";
import BaseSelect from "@/components/forms/BaseSelect.vue";
import BaseButton from "@/components/forms/BaseButton.vue";
import DualInputBox from "@/components/forms/DualInputBox.vue";
import { StaffRole } from "@/models/staff-role-enum";
import { useDepartmentsRead } from "@/composables/departments/departments-read-composable";
import BigLoader from "@/components/loaders/BigLoader.vue";
import ErrorLoader from "@/components/loaders/ErrorLoader.vue";
import { useStaffCreate } from "@/composables/staffs/staff-create-composable";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import type { WebserviceErrorResponse } from "@/models/web-service-error-response";

const title = ref("");
const firstName = ref("");
const lastName = ref("");
const staffNumber = ref("");
const password = ref("");
const role = ref("");
const departmentId = ref("");

const titleValidity = ref<ValidityState | null>(null);
const firstNameValidity = ref<ValidityState | null>(null);
const lastNameValidity = ref<ValidityState | null>(null);
const staffNumberValidity = ref<ValidityState | null>(null);
const passwordValidity = ref<ValidityState | null>(null);
const roleValidity = ref<ValidityState | null>(null);
const departmentIdValidity = ref<ValidityState | null>(null);

const toast = useToast();

const router = useRouter();

const {
  isLoading: isLoadingDepartments,
  isError: isErrorDepartments,
  data: dataDepartments,
  error: errorDepartments,
  refetch: refetchDepartments,
} = useDepartmentsRead();

const {
  departmentIdError,
  staffNumberError,
  firstNameError,
  passwordError,
  lastNameError,
  titleError,
  roleError,
  isLoading,
  isError,
  isSuccess,
  error,
  validate,
  mutate,
} = useStaffCreate();

const staffRoles = computed(() =>
  Object.values(StaffRole)
    .filter((k) => k !== "admin")
    .map((k) => ({
      value: k,
      text: k,
    }))
);

const departments = computed(
  () =>
    dataDepartments.value?.data.map((i) => ({
      value: i.id,
      text: `${i.name} (${i.code})`,
    })) ?? []
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
            case "title":
              return (titleError.value = err.message);
            case "firstName":
              return (firstNameError.value = err.message);
            case "lastName":
              return (lastNameError.value = err.message);
            case "staffNumber":
              return (staffNumberError.value = err.message);
            case "password":
              return (passwordError.value = err.message);
            case "role":
              return (roleError.value = err.message);
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
    toast.success("Staff created");
    router.push({ name: "staff-view-staff" });
  }
});

const setTitleValidity = (state: ValidityState) => {
  titleValidity.value = state;
};

const setFirstNameValidity = (state: ValidityState) => {
  firstNameValidity.value = state;
};

const setLastNameValidity = (state: ValidityState) => {
  lastNameValidity.value = state;
};

const setStaffNumberValidity = (state: ValidityState) => {
  staffNumberValidity.value = state;
};

const setPasswordValidity = (state: ValidityState) => {
  passwordValidity.value = state;
};

const setRoleValidity = (state: ValidityState) => {
  roleValidity.value = state;
};

const setDepartmentIdValidity = (state: ValidityState) => {
  departmentIdValidity.value = state;
};

const onSubmit = () => {
  if (
    validate(
      firstNameValidity.value,
      lastNameValidity.value,
      staffNumberValidity.value,
      passwordValidity.value,
      roleValidity.value,
      departmentIdValidity.value
    )
  ) {
    mutate({
      firstName: firstName.value,
      lastName: lastName.value,
      staffNumber: staffNumber.value,
      password: password.value,
      role: role.value as any,
      departmentId: Number(departmentId.value),
      title: title.value.length === 0 ? undefined : title.value,
    });
  }
};
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Create staff" />
      <BigLoader v-if="isLoadingDepartments" />
      <ErrorLoader
        v-else-if="isErrorDepartments"
        :error="errorDepartments"
        @retry="refetchDepartments"
      />
      <form
        v-else
        @submit.prevent="onSubmit"
        method="POST"
        class="w-full py-8 px-4 border rounded-lg my-4"
      >
        <fieldset :disabled="isLoading">
          <DualInputBox>
            <template #left>
              <BaseInput
                label="Title"
                id="title-input"
                v-model="title"
                :error="titleError"
                :required="false"
                @validity-change="setTitleValidity"
              />
            </template>
          </DualInputBox>

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
                label="Staff number"
                id="staff-number-input"
                v-model="staffNumber"
                :error="staffNumberError"
                @validity-change="setStaffNumberValidity"
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
              <BaseSelect
                label="Role"
                id="role-input"
                v-model="role"
                :options="staffRoles"
                :error="roleError"
                @validity-change="setRoleValidity"
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
