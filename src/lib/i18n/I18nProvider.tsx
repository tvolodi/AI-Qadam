"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Locale } from "./config";
import { defaultLocale } from "./config";
import en from "./dictionaries/en";
import ru from "./dictionaries/ru";
import uz from "./dictionaries/uz";
import ky from "./dictionaries/ky";
import tg from "./dictionaries/tg";

const dictionaries: Record<string, typeof en> = {
  en,
  ru: ru as unknown as typeof en,
  uz: uz as unknown as typeof en,
  ky: ky as unknown as typeof en,
  tg: tg as unknown as typeof en,
};

export type Dictionary = typeof en;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextValue>({
  locale: defaultLocale,
  setLocale: () => {},
  t: en,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ai-qadam-locale") as Locale | null;
    if (stored && ["en", "ru", "uz", "ky", "tg"].includes(stored)) {
      setLocaleState(stored);
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("ai-qadam-locale", l);
    document.documentElement.lang = l;
  }, []);

  const t = dictionaries[locale] ?? en;

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

/**
 * Helper to look up a localized string from a Record<string, string>.
 * Falls back to English, then to the first available value.
 */
export function localized(
  obj: Record<string, string>,
  locale: string
): string {
  return obj[locale] ?? obj.en ?? Object.values(obj)[0] ?? "";
}

export function useTranslation() {
  const { t } = useContext(I18nContext);
  return t;
}
