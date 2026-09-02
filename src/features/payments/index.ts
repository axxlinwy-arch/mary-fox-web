/**
 * Future: Payment integration
 * - Stripe / YooKassa
 * - Course purchases
 * - Shop checkout
 * - Gift certificates
 */

export const PAYMENTS_FEATURE = {
  enabled: false,
  providers: ["stripe", "yookassa"],
} as const;
