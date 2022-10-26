import type { Timetable } from "@/models/timetable-model";
import { BaseService } from "@/web-services/base-service";

export const TimetableService = {
  readMany(accessToken: string) {
    return BaseService.query<Timetable[]>("timetables", accessToken);
  },
};
