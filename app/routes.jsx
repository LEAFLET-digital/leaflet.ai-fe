import { index, layout, prefix, route } from "@react-router/dev/routes";

// Always just use string paths here — let React Router handle imports
export default [
  // Home layout + index route
  layout("src/layouts/home.jsx", [index("src/pages/home.jsx")]),

  // Auth page (standalone)
  route("auth", "src/pages/auth.jsx"),

  // Dashboard layout + nested routes
  ...prefix("dashboard/:userId", [
    layout("src/layouts/dashboard.jsx", [
      index("src/pages/dashboard.jsx"),
      route("cameras", "src/pages/cameras.jsx"),
      route("analytics", "src/pages/analytics.jsx"),
      route("facility", "src/pages/facility.jsx"),
      route("settings", "src/pages/settings.jsx"),
      route("profile", "src/pages/profile.jsx"),
    ]),
  ]),
];
