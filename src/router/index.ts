import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

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
    },
    // {
    //   path: "/staffs",
    //   name: "staffs",
    //   children: [
    //     {
    //       path: "login",
    //       name: "staff-login",
    //       component: () => import("@/views/AboutView.vue"),
    //     },
    //   ],
    // },
  ],
});

export default router;
