import { useUserStore } from "@/stores/user";
import { TimetableService } from "@/web-services/timetable-service";
import { useQuery } from "vue-query";

export function useTimetablesRead() {
  const userStore = useUserStore();

  return useQuery(["timetables"], () =>
    TimetableService.readMany(userStore.accessToken as string)
  );
}
