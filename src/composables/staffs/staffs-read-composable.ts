import { useUserStore } from "@/stores/user";
import { StaffService } from "@/web-services/staff-service";
import { useQuery } from "vue-query";

export function useStaffsRead() {
  const userStore = useUserStore();

  return useQuery("staffs", () =>
    StaffService.readMany(userStore.accessToken as string)
  );
}
