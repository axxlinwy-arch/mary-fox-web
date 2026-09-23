export const SITE = {
  name: "EUPHORIA — Тату-студия",
  shortName: "EUPHORIA",
  tagline: "Тату-студия Минск",
  description:
    "EUPHORIA — тату-студия в Минске. Искусство на коже от Mary Fox. Стерильность, качество, стиль.",
  url: "https://euphoria.minsk",
  locale: "ru_BY",
  founder: "Mary Fox",
} as const;

export const CONTACT = {
  address: "Минск, ул. Корш Саблина, 11",
  phone: "+375336022893",
  phoneDisplay: "+375 33 602-28-93",
  email: "kutasmary893@gmail.com",
  instagram: "https://instagram.com/euphoria.minsk",
  instagramHandle: "@euphoria.minsk",
  instagramCoworkingHighlight:
    "https://www.instagram.com/stories/highlights/18106992593137408/",
  maryInstagram: "https://www.instagram.com/tattoominsk_",
  maryInstagramHandle: "@tattoominsk_",
  maryTiktok: "https://www.tiktok.com/@maryfoxtattoo",
  maryTiktokHandle: "@maryfoxtattoo",
  telegram: "https://t.me/maryfoxtattooo",
  legalEntity: "ИП Кутас Мария Павловна",
  unp: "193845768",
  mapEmbed: "",
} as const;

/** Фиксированная ширина одностраничного сайта (px) */
export const LAYOUT = {
  siteWidth: 1024,
} as const;

/** Hero grid */
export const HERO = {
  maxWidth: LAYOUT.siteWidth,
  /** левая колонка : правая колонка */
  gridCols: "2fr 3fr",
  euphNadpis: { width: 1942, height: 809 },
  final: { width: 1254, height: 1254 },
} as const;

export const ASSETS = {
  euphNadpis: "/assets/euphoria/euph_nadpis.png",
  finalPhoto: "/assets/euphoria/final.png",
  dimPhoto: "/assets/euphoria/dim.png",
  heroBg: "/assets/euphoria/hero-bg.png",
  logoEuphoria: "/assets/euphoria/logo-euphoria.png",
  euphoriaTitle: "/assets/euphoria/euphoria-title.png",
  logoMedusaCircle: "/assets/euphoria/logo-medusa-circle.png",
  medusaBust: "/assets/euphoria/medusa-bust.png",
  maryCutout: "/assets/euphoria/mary-cutout.png",
  machineCutout: "/assets/euphoria/machine-cutout.png",
  logoDark: "/assets/euphoria/logo-dark.png",
  medusaLogo: "/assets/euphoria/medusa-logo.png",
  maryHero: "/assets/euphoria/mary-hero.jpg",
  mary: "/assets/euphoria/mary.JPG",
  delaettattomary: "/assets/euphoria/delaettattomary.jpg",
  delaettattomary2: "/assets/euphoria/delaettattomary2.JPG",
  maryMachine: "/assets/euphoria/mary-machine.jpg",
  maryTattooing: "/assets/euphoria/mary-tattooing.jpg",
  maryPortrait: "/assets/euphoria/mary-portrait.jpg",
  maryEditorial: "/assets/euphoria/mary-editorial.jpg",
  studio: "/assets/euphoria/studio.jpg",
  studia1: "/assets/euphoria/studia1.jpg",
  studia2: "/assets/euphoria/studia2.jpg",
  studia3: "/assets/euphoria/studia3.JPG",
  studia4: "/assets/euphoria/studia4.JPG",
  studia5: "/assets/euphoria/studia5.JPG",
  studia6: "/assets/euphoria/studia6.JPG",
  studia7: "/assets/euphoria/studia7.JPG",
  studia8: "/assets/euphoria/studia8.jpg",
  course: "/assets/euphoria/course.jpg",
  team: "/assets/euphoria/team.jpg",
  golova1: "/assets/euphoria/golova1.png",
  golova3: "/assets/euphoria/golova3.png",
  golova4: "/assets/euphoria/golova4.png",
  golovapodpiska: "/assets/euphoria/golovapodpiska.png",
  persey: "/assets/euphoria/persey.png",
  gargonavrost: "/assets/euphoria/gargonavrost.png",
  tattoo1: "/assets/euphoria/tattoo1.jpg",
  tattoo2: "/assets/euphoria/tattoo2.jpg",
  tattoo3: "/assets/euphoria/tattoo3.jpg",
  tattoo4: "/assets/euphoria/tattoo4.jpg",
  tattoo5: "/assets/euphoria/tattoo5.jpg",
  tattoo6: "/assets/euphoria/tattoo6.jpg",
  tattoo7: "/assets/euphoria/tattoo7.jpg",
  tattoo8: "/assets/euphoria/tattoo8.jpg",
  tattoo9: "/assets/euphoria/tattoo9.jpg",
  tattoo10: "/assets/euphoria/tattoo10.jpg",
  snake1: "/assets/euphoria/snake1.png",
  snake2: "/assets/euphoria/snake2.png",
} as const;
