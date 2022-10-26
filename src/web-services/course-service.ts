import type { Course } from "@/models/course-model";
import { BaseService } from "@/web-services/base-service";

export type CreateCourseType = Pick<Course, "title" | "code" | "level"> & {
  semester: string;
  departmentId: number | null;
};

export const CourseService = {
  create(form: CreateCourseType, accessToken: string) {
    return BaseService.postJson<Course>("courses", form, accessToken);
  },

  readMany(accessToken: string, departmentId?: string, semester?: string) {
    const urlParams = new URLSearchParams();

    if (departmentId) {
      urlParams.set("departmentId", departmentId);
    }

    if (semester) {
      urlParams.set("semester", semester);
    }

    return BaseService.query<Course[]>(
      `courses?${urlParams.toString()}`,
      accessToken
    );
  },
};
