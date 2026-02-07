export type ThemeId = "mermaidcore" | "frost-light" | "midnight-stark" | "thermal-glow";

export interface ThemeConfig {
  id: ThemeId;
  name: Record<string, string>;
  description: Record<string, string>;
  dataAttribute: string | null; // null = default (no attribute)
  preview: {
    bg: string;
    accent1: string;
    accent2: string;
  };
}

export const themes: ThemeConfig[] = [
  {
    id: "mermaidcore",
    name: { en: "Mermaidcore", ru: "Мермейдкор", uz: "Mermaidcore", ky: "Мермейдкор", tg: "Mermaidcore" },
    description: {
      en: "Iridescent teals, pearlescent purples, midnight blues",
      ru: "Переливающиеся бирюзовые, жемчужные фиолетовые, полуночные синие",
      uz: "Tovlanuvchi ko'k-yashil, marvarid binafsha, yarim tungi ko'k",
      ky: "Жылтырак көк-жашыл, бермет кызгылт көк, түнкү көк",
      tg: "Рангҳои обӣ дурахшон, бунафш, нимашабии кабуд",
    },
    dataAttribute: null,
    preview: {
      bg: "#0a0e1a",
      accent1: "#06b6d4",
      accent2: "#8b5cf6",
    },
  },
  {
    id: "frost-light",
    name: { en: "Frost Light", ru: "Морозный Свет", uz: "Muzli Yorug'lik", ky: "Муздак Жарык", tg: "Нури яхмак" },
    description: {
      en: "Clean, bright glassmorphism with teal and purple accents",
      ru: "Чистый, светлый глассморфизм с бирюзовыми и фиолетовыми акцентами",
      uz: "Toza, yorqin shisha effekti bilan ko'k-yashil va binafsha aksentlar",
      ky: "Таза, жарык айнек эффекти, көк-жашыл жана кызгылт көк акценттер",
      tg: "Тоза, равшан эффекти шишагӣ бо рангҳои обӣ ва бунафш",
    },
    dataAttribute: "frost-light",
    preview: {
      bg: "#f0f4f8",
      accent1: "#0891b2",
      accent2: "#7c3aed",
    },
  },
  {
    id: "midnight-stark",
    name: { en: "Midnight Stark", ru: "Полуночный Контраст", uz: "Yarim tungi Kontrast", ky: "Түнкү Контраст", tg: "Контрасти нимашабӣ" },
    description: {
      en: "Ultra-minimal, pure black and white with subtle grays",
      ru: "Ультра-минимальный, чистый черно-белый с тонкими серыми тонами",
      uz: "Ultra-minimal, sof qora va oq nozik kulrang tonlar bilan",
      ky: "Ультра-минималдуу, таза кара жана ак назик боз түстөр менен",
      tg: "Ультра-минималистӣ, сиёҳу сафед бо тонҳои хокистарии нарм",
    },
    dataAttribute: "midnight-stark",
    preview: {
      bg: "#000000",
      accent1: "#e4e4e7",
      accent2: "#a1a1aa",
    },
  },
  {
    id: "thermal-glow",
    name: { en: "Thermal Glow", ru: "Тепловое Свечение", uz: "Issiqlik Porlashi", ky: "Жылуулук Жаркырашы", tg: "Дурахши гармӣ" },
    description: {
      en: "Electric purples, fiery oranges, incandescent pinks",
      ru: "Электрические фиолетовые, огненные оранжевые, раскалённые розовые",
      uz: "Elektr binafsha, olovli to'q sariq, yonayotgan pushti",
      ky: "Электр кызгылт көк, жалындуу кызгылт сары, күйүп жаткан кызгылт",
      tg: "Бунафши электрикӣ, норинҷии оташин, гулобии дурахшон",
    },
    dataAttribute: "thermal-glow",
    preview: {
      bg: "#0c0015",
      accent1: "#f97316",
      accent2: "#ec4899",
    },
  },
];

export function getThemeById(id: ThemeId): ThemeConfig {
  return themes.find((t) => t.id === id) ?? themes[0];
}
