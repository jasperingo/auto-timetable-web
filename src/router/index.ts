import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/staffs/login",
      name: "staff-login",
      component: () => import("@/views/staffs/StaffLoginView.vue"),
      beforeEnter() {
        const userStore = useUserStore();

        if (userStore.userId > 0) {
          return { name: "staff-dashboard" };
        }
      },
    },
    {
      path: "/staffs",
      name: "staff",
      component: () => import("@/views/staffs/StaffIndexView.vue"),
      // beforeEnter() {
      //   const userStore = useUserStore();

      //   if (userStore.userId === 0) {
      //     return { name: "staff-login" };
      //   }
      // },
      children: [
        {
          alias: "",
          path: "dashboard",
          name: "staff-dashboard",
          component: () => import("@/views/staffs/StaffDashboardView.vue"),
        },
      ],
    },
  ],
});

export default router;
