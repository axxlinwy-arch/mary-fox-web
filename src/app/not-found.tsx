import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-8xl text-gradient-euphoria mb-4">404</p>
      <h1 className="text-xl text-foreground mb-2">Страница не найдена</h1>
      <p className="text-secondary-foreground mb-8 max-w-md">
        Эта страница больше не существует. Вернитесь на главную.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-full bg-gradient-euphoria px-8 py-3 text-sm font-semibold text-black"
      >
        На главную
      </Link>
    </div>
  );
}
