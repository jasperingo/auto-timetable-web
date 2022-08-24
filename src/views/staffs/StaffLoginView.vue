<script setup lang="ts">
import HomeHeader from "@/components/utils/HomeHeader.vue";
import BaseInput from "@/components/forms/BaseInput.vue";
import BaseButton from "@/components/forms/BaseButton.vue";
import { useStaffAuth } from "@/composables/auth/staff-auth-composable";
import type { WebserviceGenericErrorResponse } from "@/models/web-service-error-response";
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const password = ref("");
const staffNumber = ref("");
const passwordValidity = ref<ValidityState | null>(null);
const staffNumberValidity = ref<ValidityState | null>(null);

const toast = useToast();

const router = useRouter();

const {
  validate,
  mutation: { mutate, error, isLoading, isError, isSuccess },
  query: {
    isLoading: isLoadingStaff,
    isError: isErrorStaff,
    isSuccess: isSuccessStaff,
    error: errorStaff,
    refetch: refetchStaff,
  },
} = useStaffAuth();

watch([isSuccessStaff, isErrorStaff], () => {
  if (isErrorStaff.value) {
    if (errorStaff.value instanceof Error) {
      toast.error(errorStaff.value.message);
    } else {
      toast.error((errorStaff.value as WebserviceGenericErrorResponse).error);
    }
  }

  if (isSuccessStaff.value) {
    toast.success("Login successful");
    router.push({ name: "staff-dashboard" });
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
    refetchStaff.value();
  }
});

const onSubmit = () => {
  if (validate(staffNumberValidity.value, passwordValidity.value)) {
    mutate({ staffNumber: staffNumber.value, password: password.value });
  } else {
    toast.error("Invalid credentials");
  }
};
</script>

<template>
  <main>
    <div class="h-screen lg:flex lg:items-center">
      <section class="h-full lg:w-1/2 flex flex-col">
        <HomeHeader />
        <div class="flex-grow flex items-center justify-center">
          <form
            method="POST"
            @submit.prevent="onSubmit"
            class="w-full mx-2 py-8 px-4 border rounded-lg my-4 lg:w-96"
          >
            <fieldset :disabled="isLoading || isLoadingStaff">
              <BaseInput
                label="Staff number"
                id="staff-number-input"
                v-model="staffNumber"
                @validity-change="(v) => (staffNumberValidity = v)"
              />

              <BaseInput
                label="Password"
                id="password-input"
                type="password"
                v-model="password"
                :minlength="6"
                @validity-change="(v) => (passwordValidity = v)"
              />

              <BaseButton text="Login" :loading="isLoading || isLoadingStaff" />
            </fieldset>
          </form>
        </div>
      </section>

      <section class="hidden h-full w-1/2 lg:block">
        <img
          width="300"
          height="500"
          alt="Staffs in a meeting"
          src="@/assets/images/staffs.jpg"
          class="w-full h-full"
        />
      </section>
    </div>
  </main>
</template>
