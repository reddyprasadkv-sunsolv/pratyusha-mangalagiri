import {
  localeLabels,
  policyContent,
  type Locale,
  type PolicyKey,
} from "../i18n";
import SimpleHeader from "./SimpleHeader";

export default function PolicyPage({
  policyKey,
  locale,
}: {
  policyKey: PolicyKey;
  locale: Locale;
}) {
  const policy = policyContent[locale][policyKey];
  const labels = localeLabels[locale];
  return (
    <main data-locale={locale}>
      <SimpleHeader locale={locale} path={`/${policyKey}`} />
      <section className="policy-hero">
        <div className="container">
          <p className="eyebrow">
            <span /> {policy.eyebrow}
          </p>
          <h1>{policy.title}</h1>
          <p>{policy.intro}</p>
          <span className="draft-badge">{labels.draft}</span>
        </div>
      </section>
      <section className="container policy-body">
        {policy.sections.map((section) => (
          <article key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </article>
        ))}
        <div className="policy-meta">
          <span>{labels.lastUpdated}</span>
          <span>{labels.questions}</span>
        </div>
      </section>
    </main>
  );
}
