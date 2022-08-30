import type { Department } from "@/models/department-model";

export interface Hall {
  name: string;
  capacity: number;
  department: Department;
}
