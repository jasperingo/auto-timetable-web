import { useUserStore } from "@/stores/user";
import { CourseRegistrationService } from "@/web-services/course-registration-service";
import type { Ref } from "vue";
import { useQuery } from "vue-query";

export function useCourseRegistrationsRead(
  semester: Ref<string>,
  session: Ref<string>
) {
  const userStore = useUserStore();

  return useQuery(["course-registrations", semester, session], () =>
    CourseRegistrationService.readMany(
      userStore.accessToken as string,
      session.value,
      semester.value
    )
  );
}
