export type DashboardNavSubLinkType = {
  text: string;
  href: string;
};

export type DashboardNavLinkType = {
  text: string;
  subLinks: DashboardNavSubLinkType[];
};
