import { useUserStore } from "@/stores/user";
import { HallService } from "@/web-services/hall-service";
import type { Ref } from "vue";
import { useQuery } from "vue-query";

export function useHallsRead(departmentId: Ref<string>) {
  const userStore = useUserStore();

  return useQuery(["halls", departmentId], () =>
    HallService.readMany(userStore.accessToken as string, departmentId.value)
  );
}
