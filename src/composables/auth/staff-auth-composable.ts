import { useAuthSessionStore } from "@/composables/auth/auth-session-store-composable";
import { useUserStore } from "@/stores/user";
import { AuthService } from "@/web-services/auth-service";
import { watch } from "vue";
import { useMutation } from "vue-query";

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

  watch([mutationParams.isSuccess], () => {
    if (
      mutationParams.isSuccess.value &&
      mutationParams.data.value !== undefined
    ) {
      const auth = mutationParams.data.value.data;
      userStore.setStaffAuth(auth);
      authSessionStore.save(auth.staffId, auth.accessToken);
    }
  });

  return { ...mutationParams, validate };
}
