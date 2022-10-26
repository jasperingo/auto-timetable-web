import { useUserStore } from "@/stores/user";
import { TimetableService } from "@/web-services/timetable-service";
import type { Ref } from "vue";
import { useQuery } from "vue-query";

export function useTimetableRead(id: number | string, filter: Ref<string>) {
  const userStore = useUserStore();

  return useQuery(["timetable", id, filter], () =>
    TimetableService.read(id, userStore.accessToken as string, filter.value)
  );
}
