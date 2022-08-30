import type { Department } from "@/models/department-model";
import type { WebServiceSuccessResponse } from "@/models/web-service-success-response";
import { computed, type Ref } from "vue";

export function useDepartmentsSelectInputOptions(
  departments: Ref<undefined> | Ref<WebServiceSuccessResponse<Department[]>>
) {
  return computed(
    () =>
      departments.value?.data.map((i) => ({
        value: i.id,
        text: `${i.name} (${i.code})`,
      })) ?? []
  );
}
