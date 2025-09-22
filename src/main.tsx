
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import i18n from "./i18n";

// Force correct tab title (prevents stale caches)
if (typeof document !== "undefined") {
  document.title = "Uniqo";
  // Reflect active language for accessibility/SEO hints
  document.documentElement.lang = i18n.resolvedLanguage || "en";
  const updateMeta = () => {
    const desc = i18n.t("meta.description");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", desc);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", desc);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", desc);
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      const map: Record<string, string> = {
        en: "en_US",
        it: "it_IT",
        fr: "fr_FR",
        ca: "ca_ES",
        pt: "pt_PT",
        zh: "zh_CN",
        ja: "ja_JP",
        es: "es_ES",
        de: "de_DE",
        "pt-BR": "pt_BR",
        "es-419": "es_LA",
        "zh-TW": "zh_TW",
        ru: "ru_RU",
        ar: "ar_AR",
        ko: "ko_KR",
        no: "no_NO",
        sv: "sv_SE",
        da: "da_DK",
        pl: "pl_PL",
        nl: "nl_NL",
        ga: "ga_IE",
      };
      ogLocale.setAttribute("content", map[i18n.resolvedLanguage || "en"] || "en_US");
    }
  };
  const applyDir = () => {
    const rtlLangs = new Set(["ar", "he", "fa", "ur"]);
    const lng = i18n.resolvedLanguage || "en";
    document.documentElement.dir = rtlLangs.has(lng) ? "rtl" : "ltr";
  };
  updateMeta();
  applyDir();
  i18n.on("languageChanged", (lng) => {
    document.documentElement.lang = lng;
    updateMeta();
    applyDir();
  });
}

createRoot(document.getElementById("root")!).render(<App />);
  
