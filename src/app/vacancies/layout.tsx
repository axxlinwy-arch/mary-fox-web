import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вакансии",
  description: "Работа в Mary Fox Tattoo Studio",
};

export default function VacanciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
