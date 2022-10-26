import { useAuthSessionStore } from "@/composables/auth/auth-session-store-composable";
import { useUserStore } from "@/stores/user";
import { AuthService } from "@/web-services/auth-service";
import { StudentService } from "@/web-services/student-service";
import { watch } from "vue";
import { useMutation, useQuery } from "vue-query";

export function useStudentAuth() {
  const userStore = useUserStore();

  const authSessionStore = useAuthSessionStore();

  const validate = (
    matriculationNumber: ValidityState | null,
    password: ValidityState | null
  ) => {
    if (!matriculationNumber?.valid || !password?.valid) {
      return false;
    }
    return true;
  };

  const mutationParams = useMutation(AuthService.authStudent);

  const queryParams = useQuery(
    ["auth-student"],
    () => {
      const authStudent = mutationParams.data.value?.data;
      return StudentService.read(
        authStudent?.studentId as number,
        authStudent?.accessToken as string
      );
    },
    { enabled: false }
  );

  watch([mutationParams.isSuccess, queryParams.isSuccess], () => {
    if (
      mutationParams.isSuccess.value &&
      mutationParams.data.value !== undefined
    ) {
      const auth = mutationParams.data.value.data;
      userStore.setStudentAuth(auth);
      authSessionStore.saveStudent(auth.studentId, auth.accessToken);
    }

    if (queryParams.isSuccess.value && queryParams.data.value !== undefined) {
      userStore.setStudent(queryParams.data.value.data);
    }
  });

  return { mutation: mutationParams, query: queryParams, validate };
}
