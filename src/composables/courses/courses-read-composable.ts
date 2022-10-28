import { useUserStore } from "@/stores/user";
import { CourseService } from "@/web-services/course-service";
import type { Ref } from "vue";
import { useQuery } from "vue-query";

export function useCoursesRead(
  departmentId: Ref<string>,
  semester: Ref<string>,
  level?: Ref<string>
) {
  const userStore = useUserStore();

  return useQuery(["courses", departmentId, semester, level], () =>
    CourseService.readMany(
      userStore.accessToken as string,
      departmentId.value,
      semester.value,
      level?.value
    )
  );
}
