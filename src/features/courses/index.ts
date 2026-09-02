/**
 * Future: Online courses platform
 * - Video streaming
 * - Progress tracking
 * - Certificates
 * - Student dashboard
 */

export const COURSES_FEATURE = {
  enabled: false,
  routes: {
    dashboard: "/dashboard/courses",
    player: "/dashboard/courses/[id]/lesson/[lessonId]",
  },
} as const;
