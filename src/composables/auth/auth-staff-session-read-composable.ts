import { useAuthSessionStore } from "@/composables/auth/auth-session-store-composable";
import { useUserStore } from "@/stores/user";
import { StaffService } from "@/web-services/staff-service";

export function useAuthStaffSessionRead() {
  const userStore = useUserStore();

  const authSessionStore = useAuthSessionStore();

  return async () => {
    if (userStore.userId === 0) {
      const authSession = authSessionStore.get();

      if (!authSession.userId || !authSession.accessToken) {
        throw new Error("Session invalid");
      } else {
        const res = await StaffService.read(
          authSession.userId,
          authSession.accessToken
        );

        userStore.setStaff(res.data);

        userStore.setStaffAuth({
          staffId: Number(authSession.userId),
          accessToken: authSession.accessToken,
        });
      }
    }
  };
}
