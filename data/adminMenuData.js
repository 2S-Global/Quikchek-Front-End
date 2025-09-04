module.exports = [
  {
    title: "Dashboard",
    icon: "la-home",
    items: [
      {
        id: 1,
        name: "Dashboard Admin",
        icon: "la-home",
        routePath: "/admin/dashboard",
      },
    ],
  },
  {
    title: "List of Accounts",
    icon: "la-users",
    items: [
      {
        id: 2,
        name: "List Company",
        icon: "la-building",
        routePath: "/admin/listcompany",
      },
      {
        id: 102,
        name: "List Complex",
        icon: "la-building",
        routePath: "/admin/listcomplex",
      },
      {
        id: 3,
        name: "List Company Self",
        icon: "la-file-alt",
        routePath: "/admin/listcompanyself",
      },
      {
        id: 103,
        name: "List Users",
        icon: "la-user",
        routePath: "/admin/list-users",
      },
      {
        id: 104,
        name: "List All",
        icon: "la-users",
        routePath: "/admin/list-users-all",
      },
    ],
  },
  {
    title: "Candidates",
    icon: "la-id-badge",
    items: [
      {
        id: 5,
        name: "List Verified Candidate",
        icon: "la-id-badge",
        routePath: "/admin/listverified",
      },
    ],
  },
  {
    title: "Management",
    icon: "las la-braille",
    items: [
      {
        id: 4,
        name: "List Packages",
        icon: "la-boxes",
        routePath: "/admin/listpackage",
      },
      {
        id: 6,
        name: "Search Transaction",
        icon: "la-wallet",
        routePath: "/admin/payments",
      },
      {
        id: 7,
        name: "Report",
        icon: "la-file-alt",
        routePath: "/admin/report",
      },
      {
        id: 8,
        name: "List Slider",
        icon: "la-images",
        routePath: "/admin/listslider",
      },
    ],
  },
];
