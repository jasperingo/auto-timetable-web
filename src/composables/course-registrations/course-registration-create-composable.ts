import { useUserStore } from "@/stores/user";
import {
  CourseRegistrationService,
  type CreateCourseRegistrationType,
} from "@/web-services/course-registration-service";
import { useMutation } from "vue-query";

export function useCourseRegistrationCreate() {
  const userStore = useUserStore();

  return useMutation((CourseRegistration: CreateCourseRegistrationType) =>
    CourseRegistrationService.create(
      CourseRegistration,
      userStore.accessToken as string
    )
  );
}
