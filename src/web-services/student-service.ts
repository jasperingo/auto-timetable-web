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

  read(id: number | string, accessToken: string) {
    return BaseService.query<Student>(`students/${id}`, accessToken);
  },

  readMany(accessToken: string, departmentId?: string, session?: string) {
    const urlParams = new URLSearchParams();

    if (departmentId) {
      urlParams.set("departmentId", departmentId);
    }

    if (session) {
      urlParams.set("session", session);
    }

    return BaseService.query<Student[]>(
      `students?${urlParams.toString()}`,
      accessToken
    );
  },
};
