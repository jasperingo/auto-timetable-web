import type { Department } from "@/models/department-model";
import { BaseService } from "@/web-services/base-service";

export const DepartmentService = {
  read() {
    return BaseService.query<Department[]>("departments");
  },
};
