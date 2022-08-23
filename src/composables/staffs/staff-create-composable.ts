import { useUserStore } from "@/stores/user";
import {
  StaffService,
  type CreateStaffType,
} from "@/web-services/staff-service";
import { ref } from "vue";
import { useMutation } from "vue-query";

export function useStaffCreate() {
  const titleError = ref("");
  const firstNameError = ref("");
  const lastNameError = ref("");
  const staffNumberError = ref("");
  const passwordError = ref("");
  const roleError = ref("");
  const departmentIdError = ref("");

  const userStore = useUserStore();

  const validate = (
    firstNameValidity: ValidityState | null,
    lastNameValidity: ValidityState | null,
    staffNumberValidity: ValidityState | null,
    passwordValidity: ValidityState | null,
    roleValidity: ValidityState | null,
    departmentIdValidity: ValidityState | null
  ) => {
    let valid = true;

    if (!firstNameValidity?.valid) {
      valid = false;
      firstNameError.value = "This field is required";
    } else {
      firstNameError.value = "";
    }

    if (!lastNameValidity?.valid) {
      valid = false;
      lastNameError.value = "This field is required";
    } else {
      lastNameError.value = "";
    }

    if (!staffNumberValidity?.valid) {
      valid = false;
      staffNumberError.value = "This field is required";
    } else {
      staffNumberError.value = "";
    }

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

    if (!roleValidity?.valid) {
      valid = false;
      roleError.value = "This field is required";
    } else {
      roleError.value = "";
    }

    if (!departmentIdValidity?.valid) {
      valid = false;
      departmentIdError.value = "This field is required";
    } else {
      departmentIdError.value = "";
    }

    return valid;
  };

  const mutationParams = useMutation((staff: CreateStaffType) =>
    StaffService.create(staff, userStore.accessToken as string)
  );

  return {
    ...mutationParams,
    titleError,
    firstNameError,
    lastNameError,
    staffNumberError,
    passwordError,
    roleError,
    departmentIdError,
    validate,
  };
}
