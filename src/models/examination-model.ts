import type { Course } from "@/models/course-model";
import type { ExaminationHall } from "@/models/examination-hall-model";
import type { ExaminationInvigilator } from "@/models/examination-invigilator-model";

export interface Examination {
  id: number;
  duration: number;
  numberOfStudents: number;
  startAt: string;
  course: Course;
  halls: ExaminationHall[];
  invigilators: ExaminationInvigilator[];
}
