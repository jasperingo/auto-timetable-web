<script setup lang="ts">
import SubHeader from "@/components/utils/SubHeader.vue";
import BaseButton from "@/components/forms/BaseButton.vue";
import DualInputBox from "@/components/forms/DualInputBox.vue";
import BaseInput from "@/components/forms/BaseInput.vue";
import { useStudentUpdatePassword } from "@/composables/students/student-update-password-composable";
import type { WebserviceErrorResponse } from "@/models/web-service-error-response";
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";

const password = ref("");
const currentPassword = ref("");
const passwordValidity = ref<ValidityState | null>(null);
const currentPasswordValidity = ref<ValidityState | null>(null);

const toast = useToast();

const {
  validate,
  mutate,
  error,
  isError,
  isSuccess,
  isLoading,
  passwordError,
  currentPasswordError,
} = useStudentUpdatePassword();

watch([isSuccess, isError], () => {
  if (isError.value) {
    if (error.value instanceof Error) {
      toast.error(error.value.message);
    } else {
      const webError = error.value as WebserviceErrorResponse;
      if (webError.status === 400) {
        webError.errors.forEach((err) => {
          switch (err.name) {
            case "password":
              return (passwordError.value = err.message);
            case "currentPassword":
              return (currentPasswordError.value = err.message);
          }
        });
      } else {
        toast.error(webError.error);
      }
    }
  }

  if (isSuccess.value) {
    toast.success("Password updated");
    password.value = "";
    currentPassword.value = "";
  }
});

const setPasswordValidity = (state: ValidityState) => {
  passwordValidity.value = state;
};

const setCurrentPasswordValidity = (state: ValidityState) => {
  currentPasswordValidity.value = state;
};

const onSubmit = () => {
  if (validate(passwordValidity.value, currentPasswordValidity.value)) {
    mutate({
      password: password.value,
      currentPassword: currentPassword.value,
    });
  }
};
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Update password" />

      <form @submit.prevent="onSubmit" method="POST" class="base-form">
        <fieldset :disabled="isLoading">
          <DualInputBox>
            <template #left>
              <BaseInput
                label="New password"
                id="new-password-input"
                type="password"
                :minlength="6"
                v-model="password"
                :error="passwordError"
                @validity-change="setPasswordValidity"
              />
            </template>

            <template #right>
              <BaseInput
                label="Current password"
                id="current-password-input"
                type="password"
                :minlength="6"
                v-model="currentPassword"
                :error="currentPasswordError"
                @validity-change="setCurrentPasswordValidity"
              />
            </template>
          </DualInputBox>

          <BaseButton text="Update" :loading="isLoading" />
        </fieldset>
      </form>
    </div>
  </main>
</template>
