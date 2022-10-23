import { useUserStore } from "@/stores/user";
import { StaffService } from "@/web-services/staff-service";
import type { Ref } from "vue";
import { useQuery } from "vue-query";

export function useStaffsRead(departmentId: Ref<string>) {
  const userStore = useUserStore();

  return useQuery(["staffs", departmentId], () =>
    StaffService.readMany(userStore.accessToken as string, departmentId.value)
  );
}
