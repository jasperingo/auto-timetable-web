import { useUserStore } from "@/stores/user";
import { StudentService } from "@/web-services/student-service";
import type { Ref } from "vue";
import { useQuery } from "vue-query";

export function useStudentsRead(
  departmentId: Ref<string>,
  session: Ref<string>
) {
  const userStore = useUserStore();

  return useQuery(["students", departmentId, session], () =>
    StudentService.readMany(
      userStore.accessToken as string,
      departmentId.value,
      session.value
    )
  );
}
