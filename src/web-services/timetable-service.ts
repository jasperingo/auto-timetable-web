import type { Examination } from "@/models/examination-model";
import type { Timetable } from "@/models/timetable-model";
import { BaseService } from "@/web-services/base-service";

export const TimetableService = {
  read(id: string | number, accessToken: string) {
    return BaseService.query<Timetable>(`timetables/${id}`, accessToken);
  },

  readExamination(id: string | number, accessToken: string) {
    return BaseService.query<Examination>(
      `timetables/examination/${id}`,
      accessToken
    );
  },

  readMany(accessToken: string) {
    return BaseService.query<Timetable[]>("timetables", accessToken);
  },
};
