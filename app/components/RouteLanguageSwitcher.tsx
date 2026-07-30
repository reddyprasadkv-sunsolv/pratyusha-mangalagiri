"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { localeLabels, localePath, type Locale } from "../i18n";

export default function RouteLanguageSwitcher({
  locale,
  path = "",
}: {
  locale: Locale;
  path?: string;
}) {
  const router = useRouter();
  const labels = localeLabels[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.body.dataset.locale = locale;
    window.localStorage.setItem("site_language", locale);
  }, [locale]);

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    window.localStorage.setItem("site_language", nextLocale);
    router.push(localePath(nextLocale, path));
  };

  return (
    <div
      className="language-switcher"
      role="group"
      aria-label="Website language"
    >
      <button
        type="button"
        className={locale === "en" ? "is-active" : ""}
        aria-pressed={locale === "en"}
        aria-label={
          locale === "en"
            ? labels.activeLabel
            : "వెబ్‌సైట్ భాషను ఆంగ్లంలోకి మార్చండి"
        }
        onClick={() => switchLocale("en")}
      >
        English
      </button>
      <span aria-hidden="true">|</span>
      <button
        type="button"
        className={locale === "te" ? "is-active" : ""}
        aria-pressed={locale === "te"}
        aria-label={
          locale === "te"
            ? labels.activeLabel
            : "Switch website language to Telugu"
        }
        onClick={() => switchLocale("te")}
      >
        తెలుగు
      </button>
    </div>
  );
}
