import type { StaffAuth } from "@/models/staff-auth-model";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userId = ref(0);
  const accessToken = ref<string | null>(null);

  function setStaffAuth(auth: StaffAuth) {
    userId.value = auth.staffId;
    accessToken.value = auth.accessToken;
  }

  return { userId, accessToken, setStaffAuth };
});
