/**
 * Future: Authentication module
 * - User registration/login
 * - OAuth (Google, Apple)
 * - Session management
 * - Protected routes
 */

export const AUTH_FEATURE = {
  enabled: false,
  routes: {
    login: "/auth/login",
    register: "/auth/register",
    profile: "/auth/profile",
  },
} as const;
