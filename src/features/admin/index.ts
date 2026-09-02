/**
 * Future: Admin panel
 * - Content management
 * - User management
 * - Analytics
 * - Order management
 */

export const ADMIN_FEATURE = {
  enabled: false,
  routes: {
    dashboard: "/admin",
    artists: "/admin/artists",
    courses: "/admin/courses",
    orders: "/admin/orders",
  },
} as const;
