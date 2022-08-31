import type { DashboardNavLinkType } from "@/models/dashboard-nav-link-type";

const NAV_IEMS: DashboardNavLinkType[] = [
  {
    text: "Dashboard",
    subLinks: [
      {
        href: "/staff/dashboard",
        text: "Admin dashboard",
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

export function useStaffDashboardNavItems() {
  return NAV_IEMS;
}
