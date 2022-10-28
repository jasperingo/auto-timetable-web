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
    path: "timetables/:id",
    name: "student-read-timetable",
    component: () => import("@/views/ReadTimetableView.vue"),
  },
  {
    path: "timetables/examinations/:id",
    name: "student-read-examination",
    component: () => import("@/views/ReadExaminationView.vue"),
  },
  {
    path: "departments",
    name: "staff-read-departments",
    component: () => import("@/views/ReadDepartmentsView.vue"),
  },
];
