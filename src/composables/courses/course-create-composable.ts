import { useUserStore } from "@/stores/user";
import {
  CourseService,
  type CreateCourseType,
} from "@/web-services/course-service";
import { ref } from "vue";
import { useMutation } from "vue-query";

export function useCourseCreate() {
  const titleError = ref("");
  const codeError = ref("");
  const semesterError = ref("");
  const levelError = ref("");
  const departmentIdError = ref("");

  const userStore = useUserStore();

  const validate = (
    titleValidity: ValidityState | null,
    codeValidity: ValidityState | null,
    semesterValidity: ValidityState | null,
    levelValidity: ValidityState | null,
    departmentIdValidity: ValidityState | null
  ) => {
    let valid = true;

    if (!titleValidity?.valid) {
      valid = false;
      titleError.value = "This field is required";
    } else {
      titleError.value = "";
    }

    if (!codeValidity?.valid) {
      valid = false;
      codeError.value = "This field is required";
    } else {
      codeError.value = "";
    }

    if (!semesterValidity?.valid) {
      valid = false;
      semesterError.value = "This field is required";
    } else {
      semesterError.value = "";
    }

    if (!levelValidity?.valid) {
      valid = false;
      levelError.value = "This field is required";
    } else {
      levelError.value = "";
    }

    if (!departmentIdValidity?.valid) {
      valid = false;
      departmentIdError.value = "This field is required";
    } else {
      departmentIdError.value = "";
    }

    return valid;
  };

  const mutationParams = useMutation((course: CreateCourseType) =>
    CourseService.create(course, userStore.accessToken as string)
  );

  return {
    ...mutationParams,
    titleError,
    codeError,
    semesterError,
    levelError,
    departmentIdError,
    validate,
  };
}
