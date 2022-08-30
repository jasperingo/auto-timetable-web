import type { Department } from "@/models/department-model";
import type { Semester } from "@/models/semester-enum";

export interface Course {
  title: string;
  code: string;
  level: number;
  semester: Semester;
  department: Department;
}
