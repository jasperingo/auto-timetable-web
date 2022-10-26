import type { Examination } from "@/models/examination-model";
import type { Timetable } from "@/models/timetable-model";
import { BaseService } from "@/web-services/base-service";

export const TimetableService = {
  read(id: string | number, accessToken: string, filter?: string) {
    const urlParams = new URLSearchParams();

    if (filter) {
      urlParams.set("filter", filter);
    }

    return BaseService.query<Timetable>(
      `timetables/${id}?${urlParams.toString()}`,
      accessToken
    );
  },

  readExamination(id: string | number, accessToken: string) {
    return BaseService.query<Examination>(
      `timetables/examinations/${id}`,
      accessToken
    );
  },

  readMany(accessToken: string) {
    return BaseService.query<Timetable[]>("timetables", accessToken);
  },
};
