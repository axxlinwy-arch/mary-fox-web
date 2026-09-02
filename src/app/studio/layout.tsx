import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Студия",
  description: "Фото и видео студии Mary Fox Tattoo Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
