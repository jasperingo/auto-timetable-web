import type { Course } from "@/models/course-model";

export interface Examination {
  id: number;
  duration: number;
  numberOfStudents: number;
  startAt: string;
  course: Course;
}
