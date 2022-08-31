import type { Student } from "@/models/student-model";
import { BaseService } from "@/web-services/base-service";

export type CreateStudentType = Pick<
  Student,
  "firstName" | "lastName" | "matriculationNumber" | "password" | "joinedAt"
> & { departmentId: number };

export const StudentService = {
  create(form: CreateStudentType, accessToken: string) {
    return BaseService.postJson<Student>("students", form, accessToken);
  },
};
