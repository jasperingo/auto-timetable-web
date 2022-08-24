<script setup lang="ts">
import SubHeader from "@/components/utils/SubHeader.vue";
import { useAuthSessionStore } from "@/composables/auth/auth-session-store-composable";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();

const authSession = useAuthSessionStore();

const yes = () => {
  authSession.clear();
  userStore.clearStore();
  router.push({ name: "staff-login" });
};

const no = () => {
  router.back();
};
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Log out" />
      <div class="base-form">
        <p class="mb-4">Are you sure you want to log out?</p>

        <ul class="flex gap-x-4">
          <li>
            <button
              @click="no"
              class="bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-500"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              @click="yes"
              class="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-500"
            >
              Confirm
            </button>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
