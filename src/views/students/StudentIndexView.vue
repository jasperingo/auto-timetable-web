<script setup lang="ts">
import DashboardLayout from "@/components/utils/DashboardLayout.vue";
import type {
  DashboardNavLinkType,
  DashboardNavSubLinkType,
} from "@/models/dashboard-nav-link-type";
import { useUserStore } from "@/stores/user";

const NAV_IEMS: DashboardNavLinkType[] = [
  {
    text: "Timetable",
    subLinks: [
      {
        href: "/student/timetables",
        text: "View timetables",
      },
    ],
  },
  {
    text: "Staff",
    subLinks: [
      {
        href: "/staff/staffs",
        text: "View staffs",
      },
      {
        href: "/staff/staffs/create",
        text: "Add staff",
      },
    ],
  },
  {
    text: "Student",
    subLinks: [
      {
        href: "/staff/students",
        text: "View students",
      },
      {
        href: "/staff/students/create",
        text: "Add student",
      },
    ],
  },
  {
    text: "Department",
    subLinks: [
      {
        href: "/staff/departments",
        text: "View departments",
      },
      {
        href: "/staff/departments/create",
        text: "Add department",
      },
    ],
  },
  {
    text: "Hall",
    subLinks: [
      {
        href: "/staff/halls",
        text: "View halls",
      },
      {
        href: "/staff/halls/create",
        text: "Add hall",
      },
    ],
  },
  {
    text: "Course",
    subLinks: [
      {
        href: "/staff/courses",
        text: "View courses",
      },
      {
        href: "/staff/courses/create",
        text: "Add course",
      },
    ],
  },
];

const TOP_NAV_ITEMS: DashboardNavSubLinkType[] = [
  {
    href: "/student/profile",
    text: "Profile",
  },
  {
    href: "/student/update-password",
    text: "Update password",
  },
  {
    href: "/student/logout",
    text: "Log out",
  },
];

const userStore = useUserStore();
</script>

<template>
  <DashboardLayout
    :user-name="`${userStore.student?.firstName} ${userStore.student?.lastName}`"
    :nav-items="NAV_IEMS"
    :top-nav-items="TOP_NAV_ITEMS"
  />
</template>
