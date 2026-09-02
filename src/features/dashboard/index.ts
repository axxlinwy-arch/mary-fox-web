/**
 * Future: User dashboard
 * - Profile management
 * - Booking history
 * - Course progress
 * - Order history
 */

export const DASHBOARD_FEATURE = {
  enabled: false,
  routes: {
    home: "/dashboard",
    bookings: "/dashboard/bookings",
    courses: "/dashboard/courses",
    orders: "/dashboard/orders",
  },
} as const;
