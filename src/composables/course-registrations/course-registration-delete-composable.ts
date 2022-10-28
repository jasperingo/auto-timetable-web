import { useUserStore } from "@/stores/user";
import { CourseRegistrationService } from "@/web-services/course-registration-service";
import { useMutation } from "vue-query";

export function useCourseRegistrationDelete() {
  const userStore = useUserStore();

  return useMutation((id: number | string) =>
    CourseRegistrationService.delete(id, userStore.accessToken as string)
  );
}
