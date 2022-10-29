import { useUserStore } from "@/stores/user";
import {
  TimetableService,
  type CreateTimetableType,
} from "@/web-services/timetable-service";
import { ref } from "vue";
import { useMutation } from "vue-query";

export function useTimetableCreate() {
  const semesterError = ref("");
  const startAtError = ref("");

  const userStore = useUserStore();

  const validate = (
    semesterValidity: ValidityState | null,
    startAtValidity: ValidityState | null
  ) => {
    let valid = true;

    if (!semesterValidity?.valid) {
      valid = false;
      semesterError.value = "This field is required";
    } else {
      semesterError.value = "";
    }

    if (!startAtValidity?.valid) {
      valid = false;
      startAtError.value = "This field is required";
    } else {
      startAtError.value = "";
    }

    return valid;
  };

  const mutationParams = useMutation((timetable: CreateTimetableType) =>
    TimetableService.create(timetable, userStore.accessToken as string)
  );

  return {
    ...mutationParams,
    semesterError,
    startAtError,
    validate,
  };
}
