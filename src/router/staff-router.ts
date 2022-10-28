import type { RouteRecordRaw } from "vue-router";

export const staffRouter: RouteRecordRaw[] = [
  {
    alias: "",
    path: "dashboard",
    name: "staff-dashboard",
    component: () => import("@/views/ReadTimetablesView.vue"),
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
    path: "timetables/create",
    name: "staff-create-timetable",
    component: () => import("@/views/staffs/StaffCreateTimetableView.vue"),
  },
  {
    path: "timetables/:id",
    name: "staff-read-timetable",
    component: () => import("@/views/ReadTimetableView.vue"),
  },
  {
    path: "timetables/examinations/:id",
    name: "staff-read-examination",
    component: () => import("@/views/ReadExaminationView.vue"),
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
    component: () => import("@/views/staffs/StaffCreateDepartmentView.vue"),
  },
  {
    path: "departments",
    name: "staff-read-departments",
    component: () => import("@/views/staffs/StaffReadDepartmentsView.vue"),
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
];
