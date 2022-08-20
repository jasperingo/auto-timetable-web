import type { DashboardNavLinkType } from "@/models/dashboard-nav-link-type";

const NAV_IEMS: DashboardNavLinkType[] = [
  {
    text: "Dashboard",
    subLinks: [
      {
        href: "",
        text: "View timetables",
      },
      {
        href: "",
        text: "Generate timetable",
      },
    ],
  },
  {
    text: "Staff",
    subLinks: [
      {
        href: "",
        text: "View staffs",
      },
      {
        href: "",
        text: "Add staff",
      },
    ],
  },
];

export function useStaffDashboardNavItems() {
  return NAV_IEMS;
}
