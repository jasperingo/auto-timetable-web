import { useUserStore } from "@/stores/user";
import { AnalysisService } from "@/web-services/analysis-service";
import { useQuery } from "vue-query";

export function useAnalysisRead() {
  const userStore = useUserStore();

  return useQuery("analysis", () =>
    AnalysisService.read(userStore.accessToken as string)
  );
}
