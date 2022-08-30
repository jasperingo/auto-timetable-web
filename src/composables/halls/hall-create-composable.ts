import { useUserStore } from "@/stores/user";
import { HallService, type CreateHallType } from "@/web-services/hall-service";
import { ref } from "vue";
import { useMutation } from "vue-query";

export function useHallCreate() {
  const nameError = ref("");
  const capacityError = ref("");
  const departmentIdError = ref("");

  const userStore = useUserStore();

  const validate = (
    nameValidity: ValidityState | null,
    capacityValidity: ValidityState | null,
    departmentIdValidity: ValidityState | null
  ) => {
    let valid = true;

    if (!nameValidity?.valid) {
      valid = false;
      nameError.value = "This field is required";
    } else {
      nameError.value = "";
    }

    if (!capacityValidity?.valid) {
      valid = false;
      capacityError.value = "This field is required";
    } else {
      capacityError.value = "";
    }

    if (!departmentIdValidity?.valid) {
      valid = false;
      departmentIdError.value = "This field is required";
    } else {
      departmentIdError.value = "";
    }

    return valid;
  };

  const mutationParams = useMutation((hall: CreateHallType) =>
    HallService.create(hall, userStore.accessToken as string)
  );

  return {
    ...mutationParams,
    nameError,
    capacityError,
    departmentIdError,
    validate,
  };
}
