import Icons from "@/components/ui/icons";

export const homeRoutes = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Programs",
    href: "#programs",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Contacts",
    href: "#contacts",
  },
];

export const adminRoutes = [
  {
    label: "Dashboard",
    icon: Icons.LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Student Record",
    icon: Icons.Star,
    href: "/admin/student-record",
  },
  {
    label: "Faculty Record",
    icon: Icons.UserCircle2,
    href: "/admin/faculty-record",
  },
  {
    label: "Section and Subject",
    icon: Icons.Milestone,
    href: "/admin/section-subject",
  },
  {
    label: "Enrollment",
    icon: Icons.FileText,
    href: "/admin/enrollment",
  },
  {
    label: "Manage Accounts",
    icon: Icons.Users2,
    href: "/admin/manage-accounts",
  },
  // {
  //   label: "Document Request",
  //   icon: Icons.FolderOpen,
  //   href: "/admin/request",
  // },
];

export const facultyRoutes = [
  {
    label: "Dashboard",
    icon: Icons.LayoutDashboard,
    href: "/faculty",
  },
  {
    label: "Classes",
    icon: Icons.FileText,
    href: "/faculty/advisory-class",
  },
  {
    label: "Report Card",
    icon: Icons.Star,
    href: "/faculty/grades",
  },
];

export const studentRoutes = [
  {
    label: "Dashboard",
    icon: Icons.LayoutDashboard,
    href: "/student",
  },
  {
    label: "Report Card",
    icon: Icons.Star,
    href: "/student/grades",
  },
  {
    label: "Enrollment",
    icon: Icons.FileText,
    href: "/student/enrollment",
  },
  // {
  //   label: "Document Request",
  //   icon: Icons.FolderOpen,
  //   href: "/student/request",
  // },
];