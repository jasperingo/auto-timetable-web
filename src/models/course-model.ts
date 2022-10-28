import type { CourseRegistration } from "@/models/course-registration-model";
import type { Department } from "@/models/department-model";
import type { Semester } from "@/models/semester-enum";

export interface Course {
  id: number;
  title: string;
  code: string;
  level: number;
  semester: Semester;
  department: Department;
  courseRegistrations: CourseRegistration[];
}
