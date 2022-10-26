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
          component: () => import("@/views/staffs/StaffReadTimetablesView.vue"),
        },
        {
          path: "analysis",
          name: "staff-analysis",
          component: () => import("@/views/staffs/StaffAnalysisView.vue"),
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
          path: "timetable/create",
          name: "staff-create-timetable",
          component: () =>
            import("@/views/staffs/StaffCreateTimetableView.vue"),
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
          path: "students/create",
          name: "staff-create-student",
          component: () => import("@/views/staffs/StaffCreateStudentView.vue"),
        },
        {
          path: "students",
          name: "staff-read-students",
          component: () => import("@/views/staffs/StaffReadStudentsView.vue"),
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
        {
          path: "halls/create",
          name: "staff-create-hall",
          component: () => import("@/views/staffs/StaffCreateHallView.vue"),
        },
        {
          path: "halls",
          name: "staff-read-halls",
          component: () => import("@/views/staffs/StaffReadHallsView.vue"),
        },
        {
          path: "courses/create",
          name: "staff-create-course",
          component: () => import("@/views/staffs/StaffCreateCourseView.vue"),
        },
        {
          path: "courses",
          name: "staff-read-courses",
          component: () => import("@/views/staffs/StaffReadCoursesView.vue"),
        },
      ],
    },
  ],
});

export default router;
