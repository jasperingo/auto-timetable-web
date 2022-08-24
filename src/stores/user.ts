import type { StaffAuth } from "@/models/staff-auth-model";
import type { Staff } from "@/models/staff-model";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userId = ref(0);
  const staff = ref<Staff | null>(null);
  const accessToken = ref<string | null>(null);

  const clearStore = () => {
    userId.value = 0;
    staff.value = null;
    accessToken.value = null;
  };

  const setStaffAuth = (auth: StaffAuth) => {
    userId.value = auth.staffId;
    accessToken.value = auth.accessToken;
  };

  const setStaff = (s: Staff) => {
    staff.value = s;
  };

  return { userId, staff, accessToken, setStaffAuth, setStaff, clearStore };
});
