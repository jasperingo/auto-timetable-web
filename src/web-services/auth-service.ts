import type { StaffAuth } from "@/models/staff-auth-model";
import type { StudentAuth } from "@/models/student-auth-model";
import { BaseService } from "@/web-services/base-service";

export const AuthService = {
  authStaff(form: { staffNumber: string; password: string }) {
    return BaseService.postJson<StaffAuth>("auth/staff", form);
  },

  authStudent(form: { matriculationNumber: string; password: string }) {
    return BaseService.postJson<StudentAuth>("auth/student", form);
  },
};
