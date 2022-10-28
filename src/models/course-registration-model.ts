import type { Course } from "@/models/course-model";

export interface CourseRegistration {
  id: number;
  session: number;
  course: Course;
}
