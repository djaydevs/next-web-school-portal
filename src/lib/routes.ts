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
    label: "Document Request",
    icon: Icons.FolderOpen,
    href: "/admin/request",
  },
  {
    label: "Manage Accounts",
    icon: Icons.Users2,
    href: "/admin/manage-accounts",
  },
];

export const facultyRoutes = [
  {
    label: "Dashboard",
    icon: Icons.LayoutDashboard,
    href: "/faculty",
  },
  {
    label: "Advisory Class",
    icon: Icons.FileText,
    href: "/faculty/advisory-class",
  },
  {
    label: "Report Card",
    icon: Icons.Star,
    href: "/faculty/grades",
  },
  {
    label: "Settings",
    icon: Icons.Settings,
    href: "/settings",
  },
];

export const studentRoutes = [
  {
    label: "Dashboard",
    icon: Icons.LayoutDashboard,
    href: "/student",
  },
  {
    label: "Enrollment",
    icon: Icons.FileText,
    href: "/student/enrollment",
  },
  {
    label: "Report Card",
    icon: Icons.Star,
    href: "/student/grades",
  },
  {
    label: "Document Request",
    icon: Icons.FolderOpen,
    href: "/student/request",
  },
  {
    label: "Settings",
    icon: Icons.Settings,
    href: "/settings",
  },
];