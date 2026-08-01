import Link from "next/link";
import {
  homeContent,
  localeLabels,
  localePath,
  type Locale,
} from "../i18n";
import RouteLanguageSwitcher from "./RouteLanguageSwitcher";

export default function SimpleHeader({
  locale,
  path,
}: {
  locale: Locale;
  path: string;
}) {
  const copy = homeContent[locale];
  return (
    <header className="simple-header">
      <div className="container simple-header__inner">
        <Link className="brand" href={localePath(locale)}>
          <span className="brand__mark" aria-hidden="true">
            P
          </span>
          <span>
            <strong>PRATYUSHA</strong>
            <small>{copy.brandTagline}</small>
          </span>
        </Link>
        <div className="simple-header__actions">
          <RouteLanguageSwitcher locale={locale} path={path} />
          <Link href={localePath(locale)}>
            ← {localeLabels[locale].backHome}
          </Link>
        </div>
      </div>
    </header>
  );
}
