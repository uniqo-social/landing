import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import it from "./locales/it.json";
import fr from "./locales/fr.json";
import ca from "./locales/ca.json";
import pt from "./locales/pt.json";
import zh from "./locales/zh.json";
import ja from "./locales/ja.json";
import es from "./locales/es.json";
import de from "./locales/de.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      it: { translation: it },
      fr: { translation: fr },
      ca: { translation: ca },
      pt: { translation: pt },
      zh: { translation: zh },
      ja: { translation: ja },
      es: { translation: es },
      de: { translation: de },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "it", "fr", "ca", "pt", "zh", "ja", "es", "de"],
    interpolation: { escapeValue: false },
    detection: {
      // Prefer explicit query param, then browser, then html tag
      order: ["querystring", "navigator", "htmlTag"],
      // Use `locale` instead of the default `lng` for query param
      lookupQuerystring: "locale",
      // Do not persist in any storage
      caches: [],
    },
  });

export default i18n;
