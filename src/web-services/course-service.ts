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
};
