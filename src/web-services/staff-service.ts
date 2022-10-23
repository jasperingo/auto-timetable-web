import type { Staff } from "@/models/staff-model";
import type { UpdatePasswordType } from "@/models/update-password-type";
import { BaseService } from "@/web-services/base-service";

export type CreateStaffType = Pick<
  Staff,
  "title" | "firstName" | "lastName" | "staffNumber" | "password" | "role"
> & { departmentId: number };

export const StaffService = {
  create(form: CreateStaffType, accessToken: string) {
    return BaseService.postJson<Staff>("staffs", form, accessToken);
  },

  updatePassword(
    id: number | string,
    form: UpdatePasswordType,
    accessToken: string
  ) {
    return BaseService.putJson<Staff>(
      `staffs/${id}/password`,
      form,
      accessToken
    );
  },

  read(id: number | string, accessToken: string) {
    return BaseService.query<Staff>(`staffs/${id}`, accessToken);
  },

  readMany(accessToken: string) {
    return BaseService.query<Staff[]>("staffs", accessToken);
  },
};
