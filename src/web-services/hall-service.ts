import type { Hall } from "@/models/hall-model";
import { BaseService } from "@/web-services/base-service";

export type CreateHallType = Pick<Hall, "name" | "capacity"> & {
  departmentId: number | null;
};

export const HallService = {
  create(form: CreateHallType, accessToken: string) {
    return BaseService.postJson<Hall>("halls", form, accessToken);
  },
};
