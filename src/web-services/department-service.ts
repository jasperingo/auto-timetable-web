import type { Department } from "@/models/department-model";
import { BaseService } from "@/web-services/base-service";

export const DepartmentService = {
  create(form: Pick<Department, "code" | "name">, accessToken: string) {
    return BaseService.postJson<Department>("departments", form, accessToken);
  },

  readMany() {
    return BaseService.query<Department[]>("departments");
  },
};
