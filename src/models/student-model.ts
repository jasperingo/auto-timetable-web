import type { Department } from "@/models/department-model";

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  matriculationNumber: string;
  password: string;
  joinedAt: number;
  createdAt: string;
  department: Department;
}
