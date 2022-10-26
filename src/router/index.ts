import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { useUserStore } from "@/stores/user";
import { useAuthStaffSessionRead } from "@/composables/auth/auth-staff-session-read-composable";
import { useAuthSessionStore } from "@/composables/auth/auth-session-store-composable";
import { staffRouter } from "@/router/staff-router";
import { studentRouter } from "@/router/student-router";
import { useAuthStudentSessionRead } from "@/composables/auth/auth-student-session-read-composable";

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
      children: staffRouter,
    },
    {
      path: "/student/login",
      name: "student-login",
      component: () => import("@/views/students/StudentLoginView.vue"),
      beforeEnter() {
        const userStore = useUserStore();

        const authSessionStore = useAuthSessionStore();

        if (userStore.userId > 0 || Number(authSessionStore.get().userId) > 0) {
          return { name: "student-read-timetables" };
        }
      },
    },
    {
      path: "/student",
      name: "student",
      component: () => import("@/views/students/StudentIndexView.vue"),
      async beforeEnter() {
        const authStudent = useAuthStudentSessionRead();
        try {
          await authStudent();
        } catch {
          return { name: "student-login" };
        }
      },
      children: studentRouter,
    },
  ],
});

export default router;
