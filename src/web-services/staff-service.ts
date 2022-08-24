import type { Staff } from "@/models/staff-model";
import { BaseService } from "@/web-services/base-service";

export type CreateStaffType = Pick<
  Staff,
  "title" | "firstName" | "lastName" | "staffNumber" | "password" | "role"
> & { departmentId: number };

export const StaffService = {
  create(form: CreateStaffType, accessToken: string) {
    return BaseService.postJson<Staff>("staffs", form, accessToken);
  },

  read(id: number | string, accessToken: string) {
    return BaseService.query<Staff>(`staffs/${id}`, accessToken);
  },
};
