"use client";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-hidden touch-manipulation">
      <div className="mx-auto w-full min-[1920px]:max-w-[1920px]">{children}</div>
    </div>
  );
}
