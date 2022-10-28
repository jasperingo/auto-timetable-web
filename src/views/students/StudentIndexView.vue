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
    text: "Course",
    subLinks: [
      {
        href: "/student/courses",
        text: "View courses",
      },
      {
        href: "/student/courses-to-register",
        text: "View courses to register",
      },
      {
        href: "/student/course-registrations",
        text: "View course registrations",
      },
    ],
  },
  {
    text: "Department",
    subLinks: [
      {
        href: "/student/departments",
        text: "View departments",
      },
    ],
  },
  {
    text: "Hall",
    subLinks: [
      {
        href: "/student/halls",
        text: "View halls",
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
