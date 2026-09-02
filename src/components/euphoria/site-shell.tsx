"use client";

import { LAYOUT } from "@/constants/site";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto w-full overflow-x-hidden touch-manipulation"
      style={{ maxWidth: LAYOUT.siteWidth }}
    >
      {children}
    </div>
  );
}
