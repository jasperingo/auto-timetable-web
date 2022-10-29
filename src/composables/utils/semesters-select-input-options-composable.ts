import { Semester } from "@/models/semester-enum";
import { computed } from "vue";

export function useSemestersSelectInputOptions() {
  return computed(() =>
    Object.values(Semester).map((k) => ({
      value: k,
      text: k,
    }))
  );
}
