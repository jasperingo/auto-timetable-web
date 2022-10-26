import type { Examination } from "@/models/examination-model";

export interface Timetable {
  id: number;
  session: number;
  semester: string;
  createdAt: string;
  examinations: Examination[];
}
