import { ASSETS } from "@/constants/site";

export type StageTrack = {
  label: string;
  text: string;
};

export type Stage = {
  id: string;
  numeral: string;
  title: string;
  tags: string[];
  duration: string;
  description: string;
  items: string[];
  locked?: boolean;
  tracks?: StageTrack[];
};

export type CircleAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const SHOW_MOBILE_CIRCLES = false;

export const circles: CircleAsset[] = [
  { src: ASSETS.papyrus, alt: "Папирус", width: 1254, height: 1254 },
  { src: ASSETS.waxTablet, alt: "Восковая табличка", width: 1254, height: 1254 },
  { src: ASSETS.inkwell, alt: "Чернильница", width: 1254, height: 1254 },
];

export const stages: Stage[] = [
  {
    id: "initium",
    numeral: "I",
    title: "Обучение",
    tags: ["Оффлайн"],
    duration: "—",
    description:
      "Три формата занятий в студии — для тех, кто только начинает. Программу каждого формата уточним позже.",
    items: [
      "Первый формат: уровень, длительность и что входит в занятия.",
      "Второй формат: чем отличается от первого и кому подходит.",
      "Третий формат: акцент, практика и итог.",
    ],
  },
  {
    id: "ascensus",
    numeral: "II",
    title: "Повышение квалификации",
    tags: ["Оффлайн", "Онлайн"],
    duration: "—",
    description:
      "Для тех, кто уже работает. Можно пройти в студии или дистанционно — описание форматов добавим позже.",
    items: [
      "Как проходит повышение квалификации в студии.",
      "Как тот же формат устроен онлайн.",
    ],
  },
  {
    id: "exercitium",
    numeral: "III",
    title: "Практикумы и семинары",
    tags: ["Оффлайн"],
    duration: "—",
    description: "Короткие встречи и разборы. Даты и темы появятся здесь.",
    items: [],
    tracks: [
      {
        label: "Практикум",
        text: "Что разбираем на встрече и для какого уровня.",
      },
      {
        label: "Семинар",
        text: "Тема, формат и кому стоит прийти.",
      },
    ],
  },
  {
    id: "arcanum",
    numeral: "IV",
    title: "Секретный курс",
    tags: ["Онлайн"],
    duration: "—",
    description:
      "Программа ещё не объявлена. Когда откроем — напишем сюда всё важное.",
    items: [],
    locked: true,
  },
];
