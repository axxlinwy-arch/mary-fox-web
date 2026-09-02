import type {
  Artist,
  Course,
  FAQItem,
  GalleryItem,
  Service,
  ShopItem,
  StudioPhoto,
  Testimonial,
  Vacancy,
} from "@/types";

export const artists: Artist[] = [
  {
    id: "1",
    slug: "mary-fox",
    name: "Mary Fox",
    specialization: "Realism, Blackwork",
    experience: "12 лет",
    instagram: "https://instagram.com/maryfox",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
    bio: "Основательница студии. Специализируется на реализме и blackwork. Работала в Лондоне, Берлине и Москве.",
    styles: ["Realism", "Blackwork", "Portrait"],
  },
  {
    id: "2",
    slug: "alex-volkov",
    name: "Alex Volkov",
    specialization: "Linework, Minimal",
    experience: "8 лет",
    instagram: "https://instagram.com/alexvolkov",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    bio: "Мастер тонкой линии и минималистичных композиций. Создаёт элегантные работы с безупречной геометрией.",
    styles: ["Linework", "Minimal", "Geometric"],
  },
  {
    id: "3",
    slug: "elena-sokolova",
    name: "Elena Sokolova",
    specialization: "Neo-traditional, Color",
    experience: "6 лет",
    instagram: "https://instagram.com/elenasokolova",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    bio: "Яркие цвета и neo-traditional стиль. Каждая работа — уникальная история с глубоким смыслом.",
    styles: ["Neo-traditional", "Color", "Illustrative"],
  },
  {
    id: "4",
    slug: "dmitry-kozlov",
    name: "Dmitry Kozlov",
    specialization: "Japanese, Irezumi",
    experience: "10 лет",
    instagram: "https://instagram.com/dkozlov",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    bio: "Специалист японской традиции. Изучал технику в Токио. Мастер крупномасштабных проектов.",
    styles: ["Japanese", "Irezumi", "Large scale"],
  },
];

export const courses: Course[] = [
  {
    id: "1",
    slug: "tattoo-base",
    title: "Tattoo Base",
    subtitle: "Основы татуировки с нуля",
    description:
      "Комплексный курс для начинающих мастеров. От теории до первых работ на практике под руководством опытных наставников.",
    forWhom: [
      "Начинающие мастера без опыта",
      "Художники, желающие освоить тату",
      "Те, кто хочет сменить профессию",
    ],
    includes: [
      "120 часов практики",
      "Теория анатомии и стерильности",
      "Работа на моделях",
      "Сертификат об окончании",
      "Доступ к закрытому сообществу",
    ],
    price: "180 000 ₽",
    duration: "3 месяца",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1562962230-16e4623d36e?w=1200&q=80",
  },
  {
    id: "2",
    slug: "realism",
    title: "Realism",
    subtitle: "Мастер-класс по реализму",
    description:
      "Углублённое изучение техники реалистичной татуировки. Работа с тенями, текстурами и портретами.",
    forWhom: [
      "Мастера с базовым опытом",
      "Желающие освоить realism",
      "Профессионалы для апгрейда навыков",
    ],
    includes: [
      "60 часов интенсива",
      "Разбор работ участников",
      "Индивидуальные консультации",
      "Доступ к видео-архиву",
    ],
    price: "95 000 ₽",
    duration: "6 недель",
    level: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1200&q=80",
  },
  {
    id: "3",
    slug: "linework",
    title: "Linework",
    subtitle: "Искусство идеальной линии",
    description:
      "Курс по созданию безупречных линий. Техники, инструменты и секреты мастеров linework.",
    forWhom: [
      "Мастера всех уровней",
      "Любители минимализма",
      "Художники-иллюстраторы",
    ],
    includes: [
      "40 часов практики",
      "Мастер-классы от Alex Volkov",
      "Разбор типичных ошибок",
      "Портфолио-ready работы",
    ],
    price: "65 000 ₽",
    duration: "4 недели",
    level: "All levels",
    image:
      "https://images.unsplash.com/photo-1590246814883-8be4ef1b294a?w=1200&q=80",
  },
  {
    id: "4",
    slug: "mentorship",
    title: "Mentorship",
    subtitle: "Индивидуальное наставничество",
    description:
      "Персональная программа с Mary Fox. Разбор ваших работ, стратегия развития и доступ к закрытым сессиям.",
    forWhom: [
      "Профессиональные мастера",
      "Владельцы студий",
      "Амбициозные художники",
    ],
    includes: [
      "12 индивидуальных сессий",
      "Разбор портфолио",
      "Стратегия бренда",
      "Lifetime доступ к сообществу",
    ],
    price: "250 000 ₽",
    duration: "6 месяцев",
    level: "Advanced",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Анна М.",
    role: "Клиент",
    text: "Mary Fox создала для меня невероятный портрет. Каждая деталь продумана, атмосфера студии — на высшем уровне.",
    rating: 5,
  },
  {
    id: "2",
    name: "Игорь К.",
    role: "Ученик курса Tattoo Base",
    text: "Курс изменил мою жизнь. За 3 месяца я получил все навыки для старта карьеры. Наставники — настоящие профессионалы.",
    rating: 5,
  },
  {
    id: "3",
    name: "Мария С.",
    role: "Клиент",
    text: "Студия, где каждая деталь продумана. От записи до финального результата — безупречный сервис.",
    rating: 5,
  },
  {
    id: "4",
    name: "Денис Л.",
    role: "Ученик Realism",
    text: "Интенсив по реализму — лучшее вложение в карьеру. Техники, которые я освоил, сразу отразились в моих работах.",
    rating: 5,
  },
];

export const services: Service[] = [
  {
    id: "1",
    title: "Custom Tattoo",
    description: "Индивидуальный эскиз и татуировка от выбранного мастера",
    icon: "Pen",
  },
  {
    id: "2",
    title: "Cover-up",
    description: "Профессиональное перекрытие старых татуировок",
    icon: "Layers",
  },
  {
    id: "3",
    title: "Consultation",
    description: "Бесплатная консультация и разработка концепции",
    icon: "MessageCircle",
  },
  {
    id: "4",
    title: "Piercing",
    description: "Безопасный пирсинг с сертифицированными украшениями",
    icon: "Sparkles",
  },
];

export const gallery: GalleryItem[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80",
    title: "Portrait Realism",
    artist: "Mary Fox",
    category: "Realism",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1590246814883-8be4ef1b294a?w=800&q=80",
    title: "Geometric Linework",
    artist: "Alex Volkov",
    category: "Linework",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1562962230-16e4623d36e?w=800&q=80",
    title: "Neo-traditional Rose",
    artist: "Elena Sokolova",
    category: "Color",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1578662996442-b876148966a7?w=800&q=80",
    title: "Japanese Dragon",
    artist: "Dmitry Kozlov",
    category: "Japanese",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80",
    title: "Blackwork Sleeve",
    artist: "Mary Fox",
    category: "Blackwork",
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    title: "Minimal Line",
    artist: "Alex Volkov",
    category: "Minimal",
  },
];

export const faq: FAQItem[] = [
  {
    id: "1",
    question: "Как записаться на сеанс?",
    answer:
      "Заполните форму на странице записи или напишите нам в Telegram/Instagram. Мы свяжемся с вами в течение 24 часов.",
  },
  {
    id: "2",
    question: "Сколько стоит татуировка?",
    answer:
      "Стоимость зависит от размера, сложности и мастера. Минимальная стоимость сеанса — от 8 000 ₽. Точную цену обсудим на консультации.",
  },
  {
    id: "3",
    question: "Нужна ли предоплата?",
    answer:
      "Да, для бронирования даты требуется предоплата 30% от стоимости работы. Остаток оплачивается в день сеанса.",
  },
  {
    id: "4",
    question: "Как ухаживать за татуировкой?",
    answer:
      "После сеанса вы получите подробную инструкцию по уходу. Мы также доступны для консультаций в процессе заживления.",
  },
  {
    id: "5",
    question: "Можно ли прийти с готовым эскизом?",
    answer:
      "Конечно. Мастер адаптирует эскиз под вашу анатомию и стиль. Также мы создаём индивидуальные эскизы с нуля.",
  },
];

export const vacancies: Vacancy[] = [
  {
    id: "1",
    title: "Tattoo Artist",
    type: "Full-time",
    description:
      "Ищем талантливого мастера с опытом от 3 лет. Работа в премиальной студии с постоянным потоком клиентов.",
    requirements: [
      "Опыт от 3 лет",
      "Портфолио с реализмом или blackwork",
      "Знание стерильности и безопасности",
      "Коммуникабельность",
    ],
  },
  {
    id: "2",
    title: "Piercing Artist",
    type: "Part-time",
    description:
      "Мастер пирсинга для работы в нашей студии. Сертификация обязательна.",
    requirements: [
      "Сертификат мастера пирсинга",
      "Опыт от 1 года",
      "Знание анатомии",
      "Аккуратность и стерильность",
    ],
  },
  {
    id: "3",
    title: "Administrator",
    type: "Full-time",
    description:
      "Администратор студии. Встреча клиентов, ведение записи, поддержание атмосферы премиального сервиса.",
    requirements: [
      "Опыт в hospitality или beauty",
      "Грамотная речь",
      "Знание CRM-систем",
      "Стрессоустойчивость",
    ],
  },
];

export const shopItems: ShopItem[] = [
  {
    id: "1",
    title: "Starter Kit Pro",
    category: "kits",
    price: "45 000 ₽",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
    description: "Профессиональный стартовый набор для начинающих мастеров",
  },
  {
    id: "2",
    title: "Premium Ink Set",
    category: "supplies",
    price: "12 500 ₽",
    image:
      "https://images.unsplash.com/photo-1562962230-16e4623d36e?w=600&q=80",
    description: "Набор премиальных чернил 12 цветов",
  },
  {
    id: "3",
    title: "Gift Certificate 10 000 ₽",
    category: "certificates",
    price: "10 000 ₽",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
    description: "Подарочный сертификат на услуги студии",
  },
  {
    id: "4",
    title: "Gift Certificate 25 000 ₽",
    category: "certificates",
    price: "25 000 ₽",
    image:
      "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&q=80",
    description: "Подарочный сертификат на услуги студии",
  },
  {
    id: "5",
    title: "Needle Cartridges Pack",
    category: "supplies",
    price: "3 800 ₽",
    image:
      "https://images.unsplash.com/photo-1590246814883-8be4ef1b294a?w=600&q=80",
    description: "Набор одноразовых картриджей 50 шт.",
  },
  {
    id: "6",
    title: "Beginner Kit",
    category: "kits",
    price: "28 000 ₽",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
    description: "Базовый набор для обучения",
  },
];

export const studioPhotos: StudioPhoto[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80",
    title: "Главный зал",
    category: "interior",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1562962230-16e4623d36e?w=1200&q=80",
    title: "Рабочая станция",
    category: "equipment",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1200&q=80",
    title: "VIP кабинет",
    category: "rooms",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80",
    title: "Зона ожидания",
    category: "interior",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1590246814883-8be4ef1b294a?w=1200&q=80",
    title: "Стерилизационная",
    category: "equipment",
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80",
    title: "Кабинет для обучения",
    category: "rooms",
  },
];

export const whyChooseUs = [
  {
    id: "1",
    title: "Премиальный сервис",
    description: "Каждый клиент получает индивидуальный подход и безупречный сервис",
  },
  {
    id: "2",
    title: "Мастера мирового уровня",
    description: "Команда с опытом работы в лучших студиях Европы и Азии",
  },
  {
    id: "3",
    title: "Стерильность",
    description: "Строгое соблюдение всех стандартов безопасности и гигиены",
  },
  {
    id: "4",
    title: "Обучение",
    description: "Собственная образовательная платформа для мастеров",
  },
];
