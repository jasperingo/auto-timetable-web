import { useAuthSessionStore } from "@/composables/auth/auth-session-store-composable";
import { useUserStore } from "@/stores/user";
import { AuthService } from "@/web-services/auth-service";
import { StaffService } from "@/web-services/staff-service";
import { watch } from "vue";
import { useMutation, useQuery } from "vue-query";

export function useStaffAuth() {
  const userStore = useUserStore();

  const authSessionStore = useAuthSessionStore();

  const validate = (
    staffNumber: ValidityState | null,
    password: ValidityState | null
  ) => {
    if (!staffNumber?.valid || !password?.valid) {
      return false;
    }
    return true;
  };

  const mutationParams = useMutation(AuthService.authStaff);

  const queryParams = useQuery(
    ["auth-staff"],
    () => {
      const authStaff = mutationParams.data.value?.data;
      return StaffService.read(
        authStaff?.staffId as number,
        authStaff?.accessToken as string
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
      userStore.setStaffAuth(auth);
      authSessionStore.save(auth.staffId, auth.accessToken);
    }

    if (queryParams.isSuccess.value && queryParams.data.value !== undefined) {
      userStore.setStaff(queryParams.data.value.data);
    }
  });

  return { mutation: mutationParams, query: queryParams, validate };
}
