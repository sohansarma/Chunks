import { USER_ROLES } from "@/common/constants";
import Connections from "@/pages/SocialMedia/Connections";
import Analytics from "@/pages/SocialMedia/Analytics";
import Uploads from "@/pages/SocialMedia/Uploads";
import {
  Code,
  Database,
  LayoutDashboard,
  Link,
  Upload,
  Users,
  BarChart2,
  Share2,
  StickyNote,
  Kanban,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import QueryEditor from "@/pages/Techies/QueryEditor";
import Projects from "@/pages/Techies/Projects";
import Notes from "@/pages/Techies/Notes";

export const AdminRoutes = () => [
  {
    to: "/",
    label: "Dashboard",
    id: "dashboard",
    icon: LayoutDashboard,
    component: <Outlet />,
    roles: [USER_ROLES.ADMIN],
  },
  {
    to: "social-media",
    label: "Social Media",
    id: "socialMedia",
    icon: Share2,
    component: <Outlet />,
    roles: [USER_ROLES.ADMIN],
    subItems: [
      {
        to: "analytics",
        label: "Analytics",
        id: "analytics",
        icon: BarChart2,
        component: <Analytics />,
        roles: [USER_ROLES.ADMIN],
      },
      {
        to: "uploads",
        label: "Uploads",
        id: "uploads",
        icon: Upload,
        roles: [USER_ROLES.ADMIN],
        component: <Uploads />,
      },
      {
        to: "connections",
        label: "Connections",
        id: "connections",
        icon: Link,
        roles: [USER_ROLES.ADMIN],
        component: <Connections />,
      },
    ],
  },
  {
    to: "techies",
    label: "Techies",
    id: "techies",
    icon: Users,
    component: <Outlet />,
    roles: [USER_ROLES.ADMIN],
    subItems: [
      {
        to: "query-editor",
        icon: Database,
        label: "Query Editor",
        roles: [USER_ROLES.ADMIN],
        component: <QueryEditor />,
      },
      {
        to: "projects",
        icon: Kanban,
        label: "Projects",
        roles: [USER_ROLES.ADMIN],
        component: <Projects />,
      },
      {
        to: "notes",
        icon: StickyNote,
        label: "Notes",
        roles: [USER_ROLES.ADMIN],
        component: <Notes />,
      },
    ],
  },
];
