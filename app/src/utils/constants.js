/**
 * Application constants
 */

// Camera status types
export const CAMERA_STATUS = {
  ONLINE: "Online",
  OFFLINE: "Offline",
  WARNING: "Warning",
};

// Color schemes for different UI elements
export const COLORS = {
  primary: "blue",
  success: "green",
  warning: "yellow",
  danger: "red",
  info: "cyan",
  purple: "purple",
  orange: "orange",
};

// Component size variants
export const SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
};

// Button variants
export const BUTTON_VARIANTS = {
  primary: "primary",
  secondary: "secondary",
  ghost: "ghost",
  danger: "danger",
  success: "success",
};

// Card variants
export const CARD_VARIANTS = {
  default: "default",
  glass: "glass",
  solid: "solid",
  gradient: "gradient",
};

// Default camera resolutions
export const CAMERA_RESOLUTIONS = [
  "1280x720",
  "1920x1080",
  "2560x1440",
  "3840x2160",
];

// Default FPS values
export const CAMERA_FPS_OPTIONS = [15, 24, 25, 30, 60];

// Application routes
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  CAMERAS: "/cameras",
  ANALYTICS: "/analytics",
  SETTINGS: "/settings",
  PROFILE: "/profile",
};

// Local storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: "leaflet_user_preferences",
  CAMERA_SETTINGS: "leaflet_camera_settings",
  THEME: "leaflet_theme",
};

// API endpoints (if using a backend)
export const API_ENDPOINTS = {
  CAMERAS: "/api/cameras",
  ANALYTICS: "/api/analytics",
  USERS: "/api/users",
};

// Validation rules
export const VALIDATION_RULES = {
  CAMERA_NAME: {
    minLength: 2,
    maxLength: 50,
    required: true,
  },
  CAMERA_LOCATION: {
    minLength: 2,
    maxLength: 100,
    required: true,
  },
};

// Default grid configurations
export const GRID_CONFIGS = {
  DASHBOARD: { cols: "3", gap: "6" },
  CAMERAS: { cols: "1", gap: "4" },
  ANALYTICS: { cols: "3", gap: "6" },
};
