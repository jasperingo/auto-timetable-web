import { useUserStore } from "@/stores/user";
import { TimetableService } from "@/web-services/timetable-service";
import { useQuery } from "vue-query";

export function useExaminationRead(id: number | string) {
  const userStore = useUserStore();

  return useQuery(["examination", id], () =>
    TimetableService.readExamination(id, userStore.accessToken as string)
  );
}
