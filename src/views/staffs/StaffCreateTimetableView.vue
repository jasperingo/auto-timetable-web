<script setup lang="ts">
import BaseButton from "@/components/forms/BaseButton.vue";
import BaseInput from "@/components/forms/BaseInput.vue";
import BaseSelect from "@/components/forms/BaseSelect.vue";
import DualInputBox from "@/components/forms/DualInputBox.vue";
import SubHeader from "@/components/utils/SubHeader.vue";
import { useTimetableCreate } from "@/composables/timetables/timetable-create-composable";
import { useSemestersSelectInputOptions } from "@/composables/utils/semesters-select-input-options-composable";
import type { WebserviceErrorResponse } from "@/models/web-service-error-response";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const semester = ref("");
const startAt = ref("");
const semesterValidity = ref<ValidityState | null>(null);
const startAtValidity = ref<ValidityState | null>(null);

const toast = useToast();

const router = useRouter();

const semesters = useSemestersSelectInputOptions();

const {
  validate,
  mutate,
  error,
  isError,
  isSuccess,
  isLoading,
  startAtError,
  semesterError,
} = useTimetableCreate();

watch([isSuccess, isError], () => {
  if (isError.value) {
    if (error.value instanceof Error) {
      toast.error(error.value.message);
    } else {
      const webError = error.value as WebserviceErrorResponse;
      if (webError.status === 400) {
        webError.errors.forEach((err) => {
          switch (err.name) {
            case "startAt":
              return (startAtError.value = err.message);
            case "semester":
              return (semesterError.value = err.message);
          }
        });
      } else {
        toast.error(webError.error);
      }
    }
  }

  if (isSuccess.value) {
    toast.success("Timetable generated");
    router.push({ name: "staff-dashboard" });
  }
});

const setSemesterValidity = (state: ValidityState) => {
  semesterValidity.value = state;
};

const setStartAtValidity = (state: ValidityState) => {
  startAtValidity.value = state;
};

const onSubmit = () => {
  if (validate(semesterValidity.value, startAtValidity.value)) {
    mutate({
      startAt: startAt.value,
      semester: semester.value,
    });
  }
};
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Generate timetable" />

      <form @submit.prevent="onSubmit" method="POST" class="base-form">
        <fieldset :disabled="isLoading">
          <DualInputBox>
            <template #left>
              <BaseSelect
                label="Semester"
                id="semester-input"
                :options="semesters"
                v-model="semester"
                :error="semesterError"
                @validity-change="setSemesterValidity"
              />
            </template>

            <template #right>
              <BaseInput
                label="Start date"
                id="start-date-input"
                type="date"
                v-model="startAt"
                :error="startAtError"
                @validity-change="setStartAtValidity"
              />
            </template>
          </DualInputBox>

          <BaseButton text="Create" :loading="isLoading" />
        </fieldset>
      </form>
    </div>
  </main>
</template>
