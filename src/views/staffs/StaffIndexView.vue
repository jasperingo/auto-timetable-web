<script setup lang="ts">
import DashboardLayout from "@/components/utils/DashboardLayout.vue";
import type {
  DashboardNavLinkType,
  DashboardNavSubLinkType,
} from "@/models/dashboard-nav-link-type";
import { useUserStore } from "@/stores/user";

const NAV_IEMS: DashboardNavLinkType[] = [
  {
    text: "Dashboard",
    subLinks: [
      {
        href: "/staff/dashboard",
        text: "View timetables",
      },
      {
        href: "/staff/timetables/create",
        text: "Generate timetable",
      },
      {
        href: "/staff/analysis",
        text: "View analysis",
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
    href: "/staff/profile",
    text: "Profile",
  },
  {
    href: "/staff/update-password",
    text: "Update password",
  },
  {
    href: "/staff/logout",
    text: "Log out",
  },
];

const userStore = useUserStore();
</script>

<template>
  <DashboardLayout
    :user-name="`${userStore.staff?.firstName} ${userStore.staff?.lastName}`"
    :nav-items="NAV_IEMS"
    :top-nav-items="TOP_NAV_ITEMS"
  />
</template>
