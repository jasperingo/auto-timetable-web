import type { RouteRecordRaw } from "vue-router";

export const studentRouter: RouteRecordRaw[] = [
  {
    alias: "",
    path: "timetables",
    name: "student-read-timetables",
    component: () => import("@/views/ReadTimetablesView.vue"),
  },
  {
    path: "logout",
    name: "student-logout",
    component: () => import("@/views/students/StudentLogoutView.vue"),
  },
  {
    path: "profile",
    name: "student-profile",
    component: () => import("@/views/students/StudentProfileView.vue"),
  },
  {
    path: "update-password",
    name: "student-update-password",
    component: () => import("@/views/students/StudentUpdatePasswordView.vue"),
  },
  {
    path: "timetable/:id",
    name: "student-read-timetable",
    component: () => import("@/views/ReadTimetableView.vue"),
  },
];
