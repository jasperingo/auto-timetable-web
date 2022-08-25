import type { Department } from "@/models/department-model";
import { useUserStore } from "@/stores/user";
import { DepartmentService } from "@/web-services/department-service";
import { ref } from "vue";
import { useMutation } from "vue-query";

export function useDepartmentCreate() {
  const nameError = ref("");
  const codeError = ref("");

  const userStore = useUserStore();

  const validate = (
    nameValidity: ValidityState | null,
    codeValidity: ValidityState | null
  ) => {
    let valid = true;

    if (!codeValidity?.valid) {
      valid = false;
      codeError.value = "This field is required";
    } else {
      codeError.value = "";
    }

    if (!nameValidity?.valid) {
      valid = false;
      nameError.value = "This field is required";
    } else {
      nameError.value = "";
    }

    return valid;
  };

  const mutationParams = useMutation(
    (department: Pick<Department, "code" | "name">) =>
      DepartmentService.create(department, userStore.accessToken as string)
  );

  return {
    ...mutationParams,
    codeError,
    nameError,
    validate,
  };
}
