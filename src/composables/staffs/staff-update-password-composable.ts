import type { UpdatePasswordType } from "@/models/update-password-type";
import { useUserStore } from "@/stores/user";
import { StaffService } from "@/web-services/staff-service";
import { ref } from "vue";
import { useMutation } from "vue-query";

export function useStaffUpdatePassword() {
  const passwordError = ref("");
  const currentPasswordError = ref("");

  const userStore = useUserStore();

  const validate = (
    passwordValidity: ValidityState | null,
    currentPasswordValidity: ValidityState | null
  ) => {
    let valid = true;

    if (!passwordValidity?.valid) {
      valid = false;
      if (passwordValidity?.tooShort) {
        passwordError.value = "This field is too short";
      } else {
        passwordError.value = "This field is required";
      }
    } else {
      passwordError.value = "";
    }

    if (!currentPasswordValidity?.valid) {
      valid = false;
      if (currentPasswordValidity?.tooShort) {
        currentPasswordError.value = "This field is too short";
      } else {
        currentPasswordError.value = "This field is required";
      }
    } else {
      currentPasswordError.value = "";
    }

    return valid;
  };

  const mutationParams = useMutation((form: UpdatePasswordType) =>
    StaffService.updatePassword(
      userStore.userId,
      form,
      userStore.accessToken as string
    )
  );

  return {
    ...mutationParams,
    passwordError,
    currentPasswordError,
    validate,
  };
}
