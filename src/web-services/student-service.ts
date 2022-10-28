import type { Course } from "@/models/course-model";
import type { Student } from "@/models/student-model";
import type { UpdatePasswordType } from "@/models/update-password-type";
import { BaseService } from "@/web-services/base-service";

export type CreateStudentType = Pick<
  Student,
  "firstName" | "lastName" | "matriculationNumber" | "password" | "joinedAt"
> & { departmentId: number };

export const StudentService = {
  create(form: CreateStudentType, accessToken: string) {
    return BaseService.postJson<Student>("students", form, accessToken);
  },

  updatePassword(
    id: number | string,
    form: UpdatePasswordType,
    accessToken: string
  ) {
    return BaseService.putJson<Student>(
      `students/${id}/password`,
      form,
      accessToken
    );
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

  readManyCourses(
    id: string | number,
    accessToken: string,
    departmentId: string,
    semester: string,
    level: string
  ) {
    const urlParams = new URLSearchParams();

    if (departmentId) {
      urlParams.set("departmentId", departmentId);
    }

    if (semester) {
      urlParams.set("semester", semester);
    }

    if (level) {
      urlParams.set("level", level);
    }

    return BaseService.query<Course[]>(
      `students/${id}/courses?${urlParams.toString()}`,
      accessToken
    );
  },
};
