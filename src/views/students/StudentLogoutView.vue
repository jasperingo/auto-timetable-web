<script setup lang="ts">
import LogoutForm from "@/components/forms/LogoutForm.vue";
import SubHeader from "@/components/utils/SubHeader.vue";
import { useAuthSessionStore } from "@/composables/auth/auth-session-store-composable";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();

const authSession = useAuthSessionStore();

const yes = () => {
  authSession.clearStudent();
  userStore.clearStore();
  router.push({ name: "student-login" });
};

const no = () => {
  router.back();
};
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Log out" />

      <LogoutForm @no-clicked="no" @yes-clicked="yes" />
    </div>
  </main>
</template>
