<script setup lang="ts">
import BaseInput from "@/components/forms/BaseInput.vue";
import BaseButton from "@/components/forms/BaseButton.vue";
import LoginLayout from "@/components/utils/LoginLayout.vue";
import { useStudentAuth } from "@/composables/auth/student-auth-composable";
import type { WebserviceGenericErrorResponse } from "@/models/web-service-error-response";
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const password = ref("");
const matriculationNumber = ref("");
const passwordValidity = ref<ValidityState | null>(null);
const matriculationNumberValidity = ref<ValidityState | null>(null);

const toast = useToast();

const router = useRouter();

const {
  validate,
  mutation: { mutate, error, isLoading, isError, isSuccess },
  query: {
    isLoading: isLoadingStudent,
    isError: isErrorStudent,
    isSuccess: isSuccessStudent,
    error: errorStudent,
    refetch: refetchStudent,
  },
} = useStudentAuth();

watch([isSuccessStudent, isErrorStudent], () => {
  if (isErrorStudent.value) {
    if (errorStudent.value instanceof Error) {
      toast.error(errorStudent.value.message);
    } else {
      toast.error((errorStudent.value as WebserviceGenericErrorResponse).error);
    }
  }

  if (isSuccessStudent.value) {
    toast.success("Login successful");
    router.push({ name: "student-read-timetables" });
  }
});

watch([isSuccess, isError], () => {
  if (isError.value) {
    if (error.value instanceof Error) {
      toast.error(error.value.message);
    } else {
      toast.error((error.value as WebserviceGenericErrorResponse).error);
    }
  }

  if (isSuccess.value) {
    refetchStudent.value();
  }
});

const onSubmit = () => {
  if (validate(matriculationNumberValidity.value, passwordValidity.value)) {
    mutate({
      matriculationNumber: matriculationNumber.value,
      password: password.value,
    });
  } else {
    toast.error("Invalid credentials");
  }
};

const setMatriculationNumberValidity = (v: ValidityState) => {
  matriculationNumberValidity.value = v;
};

const setPasswordValidity = (v: ValidityState) => {
  passwordValidity.value = v;
};
</script>

<template>
  <LoginLayout @on-form-submit="onSubmit">
    <fieldset :disabled="isLoading || isLoadingStudent">
      <BaseInput
        label="Matriculation number"
        id="matriculation-number-input"
        v-model="matriculationNumber"
        @validity-change="setMatriculationNumberValidity"
      />

      <BaseInput
        label="Password"
        id="password-input"
        type="password"
        v-model="password"
        :minlength="6"
        @validity-change="setPasswordValidity"
      />

      <BaseButton text="Login" :loading="isLoading || isLoadingStudent" />
    </fieldset>
  </LoginLayout>
</template>
