import type { Course } from "@/models/course-model";
import type { Student } from "@/models/student-model";

export interface CourseRegistration {
  id: number;
  session: number;
  course: Course;
  student: Student;
}
