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
        href: "",
        text: "View students",
      },
      {
        href: "",
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
        href: "",
        text: "View halls",
      },
      {
        href: "",
        text: "Add hall",
      },
    ],
  },
  {
    text: "Course",
    subLinks: [],
  },
];

export function useStaffDashboardNavItems() {
  return NAV_IEMS;
}
