import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Запись на сеанс",
  description: "Запишитесь на тату-сессию в Mary Fox Tattoo Studio",
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
