import type { Department } from "@/models/department-model";

export interface Hall {
  id: number;
  name: string;
  capacity: number;
  department?: Department;
}
