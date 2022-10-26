import type { RouteRecordRaw } from "vue-router";

export const studentRouter: RouteRecordRaw[] = [
  {
    alias: "",
    path: "timetables",
    name: "student-read-timetables",
    component: () => import("@/views/students/StudentReadTimetablesView.vue"),
  },
];
