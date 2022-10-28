import type { CourseRegistration } from "@/models/course-registration-model";
import { BaseService } from "@/web-services/base-service";

export type CreateCourseRegistrationType = {
  studentId: number;
  courseId: number;
};

export const CourseRegistrationService = {
  create(form: CreateCourseRegistrationType, accessToken: string) {
    return BaseService.postJson<CourseRegistration>(
      "course-registrations",
      form,
      accessToken
    );
  },

  delete(id: string | number, accessToken: string) {
    return BaseService.mutate<CourseRegistration>(
      `course-registrations/${id}`,
      "DELETE",
      undefined,
      accessToken
    );
  },

  readMany(accessToken: string, session: string, semester: string) {
    const urlParams = new URLSearchParams();

    if (session) {
      urlParams.set("session", session);
    }

    if (semester) {
      urlParams.set("semester", semester);
    }

    return BaseService.query<CourseRegistration[]>(
      `course-registrations?${urlParams.toString()}`,
      accessToken
    );
  },
};
