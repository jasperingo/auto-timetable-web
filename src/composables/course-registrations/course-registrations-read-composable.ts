import { useUserStore } from "@/stores/user";
import { StudentService } from "@/web-services/student-service";
import type { Ref } from "vue";
import { useQuery } from "vue-query";

export function useCourseRegistrationsRead(
  semester: Ref<string>,
  session: Ref<string>
) {
  const userStore = useUserStore();

  return useQuery(["course-registrations", semester, session], () =>
    StudentService.readManyCourseRegistrations(
      userStore.userId,
      userStore.accessToken as string,
      session.value,
      semester.value
    )
  );
}
