import { index, layout, prefix, route } from "@react-router/dev/routes";

// Always just use string paths here — let React Router handle imports
export default [
  // Home layout + index route
  layout("src/layouts/home.jsx", [index("src/pages/home.jsx")]),

  // Dashboard layout + nested routes
  ...prefix("dashboard", [
    layout("src/layouts/dashboard.jsx", [
      index("src/pages/dashboard.jsx"),
      route(":userId/cameras", "src/pages/cameras.jsx"),
      route(":userId/analytics", "src/pages/analytics.jsx"),
      route(":userId/facility", "src/pages/facility.jsx"),
      route(":userId/settings", "src/pages/settings.jsx"),
      route(":userId/profile", "src/pages/profile.jsx"),
    ]),
  ]),
];
