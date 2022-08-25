import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { useUserStore } from "@/stores/user";
import { useAuthStaffSessionRead } from "@/composables/auth/auth-staff-session-read-composable";
import { useAuthSessionStore } from "@/composables/auth/auth-session-store-composable";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
    {
      path: "/staff/login",
      name: "staff-login",
      component: () => import("@/views/staffs/StaffLoginView.vue"),
      beforeEnter() {
        const userStore = useUserStore();

        const authSessionStore = useAuthSessionStore();

        if (userStore.userId > 0 || Number(authSessionStore.get().userId) > 0) {
          return { name: "staff-dashboard" };
        }
      },
    },
    {
      path: "/staff",
      name: "staff",
      component: () => import("@/views/staffs/StaffIndexView.vue"),
      async beforeEnter() {
        const authStaff = useAuthStaffSessionRead();
        try {
          await authStaff();
        } catch {
          return { name: "staff-login" };
        }
      },
      children: [
        {
          alias: "",
          path: "dashboard",
          name: "staff-dashboard",
          component: () => import("@/views/staffs/StaffDashboardView.vue"),
        },
        {
          path: "profile",
          name: "staff-profile",
          component: () => import("@/views/staffs/StaffProfileView.vue"),
        },
        {
          path: "update-password",
          name: "staff-update-password",
          component: () => import("@/views/staffs/StaffUpdatePasswordView.vue"),
        },
        {
          path: "logout",
          name: "staff-logout",
          component: () => import("@/views/staffs/StaffLogoutView.vue"),
        },
        {
          path: "staffs/create",
          name: "staff-create-staff",
          component: () => import("@/views/staffs/StaffCreateStaffView.vue"),
        },
        {
          path: "staffs",
          name: "staff-read-staffs",
          component: () => import("@/views/staffs/StaffReadStaffsView.vue"),
        },
        {
          path: "departments/create",
          name: "staff-create-department",
          component: () =>
            import("@/views/staffs/StaffCreateDepartmentView.vue"),
        },
        {
          path: "departments",
          name: "staff-read-departments",
          component: () =>
            import("@/views/staffs/StaffReadDepartmentsView.vue"),
        },
      ],
    },
  ],
});

export default router;
