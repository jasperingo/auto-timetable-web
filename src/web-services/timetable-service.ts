import type { Timetable } from "@/models/timetable-model";
import { BaseService } from "@/web-services/base-service";

export const TimetableService = {
  read(id: string | number, accessToken: string) {
    return BaseService.query<Timetable>(`timetables/${id}`, accessToken);
  },

  readMany(accessToken: string) {
    return BaseService.query<Timetable[]>("timetables", accessToken);
  },
};
