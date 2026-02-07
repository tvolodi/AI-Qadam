export type Locale = "en" | "ru" | "uz" | "ky" | "tg";

export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "ru", "uz", "ky", "tg"];

export type Dictionary = typeof import("./dictionaries/en").default;
