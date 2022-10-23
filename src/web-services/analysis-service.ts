import type { Analysis } from "@/models/analysis-model";
import { BaseService } from "@/web-services/base-service";

export const AnalysisService = {
  read(accessToken: string) {
    return BaseService.query<Analysis>("analysis", accessToken);
  },
};
