import type { StaffAuth } from "@/models/staff-auth-model";
import { BaseService } from "@/web-services/base-service";

export const AuthService = {
  authStaff(form: { staffNumber: string; password: string }) {
    return BaseService.postJson<StaffAuth>("auth/staff", form);
  },
};
