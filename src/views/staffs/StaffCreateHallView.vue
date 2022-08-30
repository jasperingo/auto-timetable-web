<script setup lang="ts">
import SubHeader from "@/components/utils/SubHeader.vue";
import DualInputBox from "@/components/forms/DualInputBox.vue";
import BaseInput from "@/components/forms/BaseInput.vue";
import BaseButton from "@/components/forms/BaseButton.vue";
import BigLoader from "@/components/loaders/BigLoader.vue";
import ErrorLoader from "@/components/loaders/ErrorLoader.vue";
import BaseSelect from "@/components/forms/BaseSelect.vue";
import { useDepartmentsRead } from "@/composables/departments/departments-read-composable";
import { useHallCreate } from "@/composables/halls/hall-create-composable";
import { useDepartmentsSelectInputOptions } from "@/composables/utils/departments-select-input-options-composable";
import type { WebserviceErrorResponse } from "@/models/web-service-error-response";
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const name = ref("");
const capacity = ref("");
const departmentId = ref("");
const nameValidity = ref<ValidityState | null>(null);
const capacityValidity = ref<ValidityState | null>(null);
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
  mutate,
  validate,
  error,
  isError,
  isSuccess,
  isLoading,
  nameError,
  capacityError,
  departmentIdError,
} = useHallCreate();

const departments = useDepartmentsSelectInputOptions(departmentsData);

watch([isSuccess, isError], () => {
  if (isError.value) {
    if (error.value instanceof Error) {
      toast.error(error.value.message);
    } else {
      const webError = error.value as WebserviceErrorResponse;
      if (webError.status === 400) {
        webError.errors.forEach((err) => {
          switch (err.name) {
            case "name":
              return (nameError.value = err.message);
            case "capacity":
              return (capacityError.value = err.message);
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
    toast.success("Hall created");
    router.push({ name: "staff-read-halls" });
  }
});

const setNameValidity = (state: ValidityState) => {
  nameValidity.value = state;
};

const setCapacityValidity = (state: ValidityState) => {
  capacityValidity.value = state;
};

const setDepartmentIdValidity = (state: ValidityState) => {
  departmentIdValidity.value = state;
};

const onSubmit = () => {
  if (
    validate(
      nameValidity.value,
      capacityValidity.value,
      departmentIdValidity.value
    )
  ) {
    mutate({
      name: name.value,
      capacity: Number(capacity.value),
      departmentId:
        departmentId.value.length === 0 ? null : Number(departmentId.value),
    });
  }
};
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Create hall" />

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
                label="Name"
                id="name-input"
                v-model="name"
                :error="nameError"
                @validity-change="setNameValidity"
              />
            </template>

            <template #right>
              <BaseInput
                label="Capacity"
                id="capacity-input"
                v-model="capacity"
                type="number"
                :min="1"
                :error="capacityError"
                @validity-change="setCapacityValidity"
              />
            </template>
          </DualInputBox>

          <DualInputBox>
            <template #left>
              <BaseSelect
                label="Department"
                id="department-input"
                v-model="departmentId"
                :required="false"
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
