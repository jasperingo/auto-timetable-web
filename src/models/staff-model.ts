import type { Department } from "@/models/department-model";
import type { StaffRole } from "@/models/staff-role-enum";

export interface Staff {
  id: number;
  title?: string;
  firstName: string;
  lastName: string;
  staffNumber: string;
  password: string;
  role: StaffRole;
  createdAt: string;
  department?: Department;
}
