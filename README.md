# Mary Fox Tattoo Studio

Премиальный фронтенд-сайт тату-студии Mary Fox. Визуальный скелет для дальнейшего развития в образовательную платформу.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS**
- **shadcn/ui**
- **Framer Motion**
- **Lucide Icons**

## Getting Started

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/              # Pages & routing (App Router)
├── components/
│   ├── layout/       # Navbar, Footer, LoadingScreen
│   ├── shared/       # Reusable UI components
│   └── ui/           # shadcn/ui primitives
├── sections/         # Page sections (Home, etc.)
├── features/         # Future modules (auth, payments, CRM...)
├── mock/             # Mock data
├── types/            # TypeScript types
├── constants/        # Site config & constants
└── lib/              # Utilities
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — все секции на одной странице |
| `/about` | О студии |
| `/artists` | Список мастеров |
| `/artists/[slug]` | Страница мастера |
| `/book` | Запись на сеанс (UI) |
| `/education` | Курсы |
| `/education/[slug]` | Страница курса |
| `/shop` | Магазин (UI) |
| `/studio` | Фото студии |
| `/vacancies` | Вакансии |
| `/contacts` | Контакты |

## Brand Colors

- Background: `#FFFFFF`
- Cards: `#F8F8FA`
- Text: `#0E0E10`
- Accent: `#FF1493`

## Future Features (Architecture Ready)

- Authentication (`features/auth`)
- Online courses (`features/courses`)
- User dashboard (`features/dashboard`)
- Payments (`features/payments`)
- Schedule & CRM (`features/schedule`)
- Admin panel (`features/admin`)
- E-commerce (`features/shop`)

## Notes

- Все данные — mock, без API и базы данных
- Формы показывают UI успеха, но ничего не отправляют
- Изображения — Unsplash (легко заменить в `src/mock/data.ts`)
- Логотип: `public/assets/logo.png`
