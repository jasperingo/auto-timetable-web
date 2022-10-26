import { useAuthSessionStore } from "@/composables/auth/auth-session-store-composable";
import { useUserStore } from "@/stores/user";
import { StudentService } from "@/web-services/student-service";

export function useAuthStudentSessionRead() {
  const userStore = useUserStore();

  const authSessionStore = useAuthSessionStore();

  return async () => {
    if (userStore.userId === 0) {
      const authSession = authSessionStore.getStudent();

      if (!authSession.userId || !authSession.accessToken) {
        throw new Error("Session invalid");
      } else {
        const res = await StudentService.read(
          authSession.userId,
          authSession.accessToken
        );

        userStore.setStudent(res.data);

        userStore.setStudentAuth({
          studentId: Number(authSession.userId),
          accessToken: authSession.accessToken,
        });
      }
    }
  };
}
