/**
 * Future: Artist schedule & CRM
 * - Calendar management
 * - Booking system
 * - Client database
 * - Notifications
 */

export const SCHEDULE_FEATURE = {
  enabled: false,
  routes: {
    calendar: "/admin/schedule",
    bookings: "/admin/bookings",
  },
} as const;
