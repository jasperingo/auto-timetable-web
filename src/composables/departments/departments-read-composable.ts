import { DepartmentService } from "@/web-services/department-service";
import { useQuery } from "vue-query";

export function useDepartmentsRead() {
  return useQuery("departments", DepartmentService.readMany);
}
