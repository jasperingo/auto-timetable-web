import { useUserStore } from "@/stores/user";
import { StudentService } from "@/web-services/student-service";
import type { Ref } from "vue";
import { useQuery } from "vue-query";

export function useCoursesToRegisterRead(
  departmentId: Ref<string>,
  semester: Ref<string>,
  level: Ref<string>
) {
  const userStore = useUserStore();

  return useQuery(["courses-to-register", departmentId, semester, level], () =>
    StudentService.readManyCourses(
      userStore.student?.id as number,
      userStore.accessToken as string,
      departmentId.value,
      semester.value,
      level.value
    )
  );
}
