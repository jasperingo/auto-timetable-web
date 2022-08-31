import { useUserStore } from "@/stores/user";
import {
  StudentService,
  type CreateStudentType,
} from "@/web-services/student-service";
import { ref } from "vue";
import { useMutation } from "vue-query";

export function useStudentCreate() {
  const firstNameError = ref("");
  const lastNameError = ref("");
  const matriculationNumberError = ref("");
  const passwordError = ref("");
  const joinedAtError = ref("");
  const departmentIdError = ref("");

  const userStore = useUserStore();

  const validate = (
    firstNameValidity: ValidityState | null,
    lastNameValidity: ValidityState | null,
    matriculationNumberValidity: ValidityState | null,
    passwordValidity: ValidityState | null,
    joinedAtValidity: ValidityState | null,
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

    if (!matriculationNumberValidity?.valid) {
      valid = false;
      matriculationNumberError.value = "This field is required";
    } else {
      matriculationNumberError.value = "";
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

    if (!joinedAtValidity?.valid) {
      valid = false;
      joinedAtError.value = "This field is required";
    } else {
      joinedAtError.value = "";
    }

    if (!departmentIdValidity?.valid) {
      valid = false;
      departmentIdError.value = "This field is required";
    } else {
      departmentIdError.value = "";
    }

    return valid;
  };

  const mutationParams = useMutation((student: CreateStudentType) =>
    StudentService.create(student, userStore.accessToken as string)
  );

  return {
    ...mutationParams,
    firstNameError,
    lastNameError,
    matriculationNumberError,
    passwordError,
    joinedAtError,
    departmentIdError,
    validate,
  };
}
