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
    :nav-items="NAV_IEMS"
    :top-nav-items="TOP_NAV_ITEMS"
    :user-name="`${userStore.student?.firstName} ${userStore.student?.lastName}`"
  />
</template>
