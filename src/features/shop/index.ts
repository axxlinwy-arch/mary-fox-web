/**
 * Future: E-commerce shop
 * - Product catalog
 * - Cart & checkout
 * - Inventory management
 * - International shipping
 */

export const SHOP_FEATURE = {
  enabled: false,
  routes: {
    catalog: "/shop",
    cart: "/shop/cart",
    checkout: "/shop/checkout",
  },
} as const;
