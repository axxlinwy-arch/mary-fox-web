import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Магазин",
  description: "Стартовые наборы, расходники и подарочные сертификаты Mary Fox",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
