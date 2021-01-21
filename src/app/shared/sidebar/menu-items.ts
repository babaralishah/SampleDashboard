import { RouteInfo } from "./sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: "",
    title: "Personal",
    icon: "mdi mdi-dots-horizontal",
    class: "nav-small-cap",
    extralink: true,
    submenu: [],
  },
  {
    path: "/Profile",
    title: "User Profile",
    icon: "mdi mdi-account",
    class: "",
    extralink: false,
    submenu: [],
  },
  // {
  //   path: "/dashboard",
  //   title: "Dashboard",
  //   icon: "mdi mdi-gauge",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  {
    path: "",
    title: "MENU",
    icon: "mdi mdi-dots-horizontal",
    class: "nav-small-cap",
    extralink: true,
    submenu: [],
  },
  {
    path: "/Home",
    title: "Home",
    icon: "fas fa-home",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/Main",
    title: "Main",
    icon: "fas fa-hdd",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/agent",
    title: "Processed Data File",
    icon: "fas fa-file-alt",
    class: "",
    extralink: false,
    submenu: [],
  },
  // {
  //   path: "/inventory",
  //   title: "Processed Data File",
  //   icon: "fas fa-file-powerpoint",
  //   class: "",
  //   extralink: false,
  //   submenu: [],
  // },
  {
    path: "/Visualization",
    title: "Visualization",
    icon: "fas fa-chart-pie",
    class: "",
    extralink: false,
    submenu: [],
  },
  {
    path: "/faq",
    title: "FAQ",
    icon: "fas fa-chart-pie",
    class: "",
    extralink: false,
    submenu: [],
  },
];
