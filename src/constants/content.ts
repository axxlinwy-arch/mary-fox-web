export const HERO = {
  title: "EUPHORIA",
  subtitle: "Тату-студия в Минске",
  tagline: "Искусство на коже",
  description:
    "Пространство, где тату становится искусством. Основатель — Mary Fox: 9 лет опыта, более 5000 довольных клиентов.",
  ctaOffer: "Публичная оферта",
  ctaBook: "Записаться",
} as const;

export const HERO_STATS = [
  { title: "Лучшие мастера", subtitle: "в одном пространстве" },
  { title: "5000+ довольных", subtitle: "клиентов" },
  { title: "9 лет", subtitle: "опыта" },
] as const;

export const HERO_SERVICES = [
  "Тату любой сложности",
  "Обучение",
  "Индивидуальный подход",
  "Перекрытие",
  "Стерильность",
] as const;

export const ABOUT = {
  title: "О студии",
  paragraphs: [
    "EUPHORIA — это больше, чем тату-студия. Пространство с атмосферой, коворкингом для мастеров и вниманием к каждой детали — от эскиза до заживления.",
    "Студию основала Mary Fox и построила своими руками. Сегодня здесь рождаются сильные мастера.",
    "Тату любой сложности, cover up, обучение и семинары — всё в одном месте, где комфортно и клиентам, и художникам.",
  ],
  stats: [
    { value: "9+", label: "лет опыта" },
    { value: "5000+", label: "клиентов" },
    { value: "100%", label: "стерильность" },
  ],
} as const;

export const MARY_FOX = {
  id: "master",
  label: "Mary Fox",
  title: "Мастер. Художник. Основатель",
  roles: [
    "Создатель студии EUPHORIA",
    "Лицо бренда",
    "Мастер — за плечами тысячи работ и сотни учеников",
    "Наставник",
  ],
  tags: ["Cover up", "Тату любой сложности"],
  stats: [
    { value: "9", label: "лет в индустрии" },
    { value: "5000+", label: "клиентов" },
  ],
  highlights: [
    {
      id: "styles",
      title: "Стили и cover up",
      text: "Работает в разных стилях — от простых эскизов до сложных работ. Перекрытия и cover up с продуманным эскизом под вашу задачу и анатомию.",
    },
    {
      id: "education",
      title: "Обучение мастеров",
      text: "Семинары и практикумы для мастеров любого уровня. По итогам обучения — сертификат.",
    },
    {
      id: "coworking",
      title: "Коворкинг в студии",
      text: " Студия предлагает продуманное коворкинг-пространство, объединяющее под одной крышей ведущих мастеров и саму основательницу",
    },
  ],
  imageKey: "mary" as const,
  gallery: [
    { key: "mary" as const, alt: "Mary Fox — EUPHORIA" },
    { key: "delaettattomary" as const, alt: "Работа Mary Fox — cover up" },
    { key: "delaettattomary2" as const, alt: "Работа Mary Fox" },
  ],
  secondaryImages: [
    { key: "delaettattomary" as const, alt: "Работа Mary Fox — cover up" },
    { key: "delaettattomary2" as const, alt: "Работа Mary Fox" },
  ],
} as const;

export const PHOTO_SECTIONS = [
  {
    id: "education",
    label: "Обучение",
    title: "Семинары и практикумы",
    text: "Mary Fox проводит образовательные программы для мастеров любого уровня — от базы до углублённой практики. Живые семинары, разбор работ и сертификат по итогам обучения.",
    imageKey: "course" as const,
    align: "right" as const,
  },
] as const;

export const STUDIO = {
  id: "studio",
  label: "Студия",
  title: "Атмосфера, в которой хочется творить",
  text: "EUPHORIA создана своими руками — для комфорта, атмосферы, коворкинга мастеров и хорошего настроения.",
  photos: [
    { key: "studio", alt: "Интерьер студии EUPHORIA" },
    { key: "studia1", alt: "Студия EUPHORIA" },
    { key: "studia2", alt: "Студия EUPHORIA" },
    { key: "studia5", alt: "Студия EUPHORIA" },
    { key: "studia4", alt: "Студия EUPHORIA" },
    { key: "studia7", alt: "Студия EUPHORIA" },
    { key: "studia8", alt: "Студия EUPHORIA" },
    { key: "studia3", alt: "Студия EUPHORIA" },
    { key: "studia6", alt: "Студия EUPHORIA" },
  ],
} as const;

export const GALLERY = [
  { imageKey: "tattoo1" as const, alt: "Татуировка EUPHORIA — работа 1" },
  { imageKey: "tattoo2" as const, alt: "Татуировка EUPHORIA — работа 2" },
  { imageKey: "tattoo3" as const, alt: "Татуировка EUPHORIA — работа 3" },
  { imageKey: "tattoo4" as const, alt: "Татуировка EUPHORIA — работа 4" },
  { imageKey: "tattoo5" as const, alt: "Татуировка EUPHORIA — работа 5" },
  { imageKey: "tattoo6" as const, alt: "Татуировка EUPHORIA — работа 6" },
  { imageKey: "tattoo7" as const, alt: "Татуировка EUPHORIA — работа 7" },
  { imageKey: "tattoo8" as const, alt: "Татуировка EUPHORIA — работа 8" },
  { imageKey: "tattoo9" as const, alt: "Татуировка EUPHORIA — работа 9" },
  { imageKey: "tattoo10" as const, alt: "Татуировка EUPHORIA — работа 10" },
] as const;

export const OFFER = {
  title: "Публичная оферта",
  description:
    "Документ публикуется в соответствии с законодательством Республики Беларусь и необходим для законного оказания услуг татуировки.",
  placeholder:
    "Документ скоро будет доступен для просмотра и скачивания. Следите за обновлениями на сайте.",
  note: "До публикации документа информация на сайте носит ознакомительный характер.",
} as const;
