<script setup lang="ts">
import SubHeader from "@/components/utils/SubHeader.vue";
import BaseButton from "@/components/forms/BaseButton.vue";
import BaseInput from "@/components/forms/BaseInput.vue";
import DualInputBox from "@/components/forms/DualInputBox.vue";
import { useDepartmentCreate } from "@/composables/departments/department-create-composable";
import type { WebserviceErrorResponse } from "@/models/web-service-error-response";
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const name = ref("");
const code = ref("");
const nameValidity = ref<ValidityState | null>(null);
const codeValidity = ref<ValidityState | null>(null);

const toast = useToast();

const router = useRouter();

const {
  nameError,
  codeError,
  isLoading,
  isError,
  isSuccess,
  error,
  validate,
  mutate,
} = useDepartmentCreate();

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
            case "name":
              return (nameError.value = err.message);
          }
        });
      } else {
        toast.error(webError.error);
      }
    }
  }

  if (isSuccess.value) {
    toast.success("Department created");
    router.push({ name: "staff-read-departments" });
  }
});

const setNameValidity = (state: ValidityState) => {
  nameValidity.value = state;
};

const setCodeValidity = (state: ValidityState) => {
  codeValidity.value = state;
};

const onSubmit = () => {
  if (validate(nameValidity.value, codeValidity.value)) {
    mutate({ code: code.value, name: name.value });
  }
};
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Create department" />

      <form @submit.prevent="onSubmit" method="POST" class="base-form">
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
                label="Code"
                id="code-input"
                v-model="code"
                :minlength="3"
                :maxlength="3"
                :error="codeError"
                @validity-change="setCodeValidity"
              />
            </template>
          </DualInputBox>

          <BaseButton text="Create" :loading="isLoading" />
        </fieldset>
      </form>
    </div>
  </main>
</template>
