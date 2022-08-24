import { useUserStore } from "@/stores/user";
import { StaffService } from "@/web-services/staff-service";
import { useQuery } from "vue-query";

export function useStaffRead(id: number | string) {
  const userStore = useUserStore();

  return useQuery(["staff", id], () =>
    StaffService.read(id, userStore.accessToken as string)
  );
}
