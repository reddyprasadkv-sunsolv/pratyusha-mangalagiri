"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  homeContent,
  localeLabels,
  localePath,
  type Locale,
} from "../i18n";

type LeadDraft = {
  name: string;
  mobile: string;
  email: string;
  city: string;
  requirement: string;
  message: string;
  consent: boolean;
};

const emptyDraft: LeadDraft = {
  name: "",
  mobile: "",
  email: "",
  city: "",
  requirement: "",
  message: "",
  consent: false,
};

function BrandMark({
  locale,
  inverse = false,
}: {
  locale: Locale;
  inverse?: boolean;
}) {
  const copy = homeContent[locale];
  return (
    <Link
      className={`brand ${inverse ? "brand--inverse" : ""}`}
      href={`${localePath(locale)}#home`}
    >
      <span className="brand__mark" aria-hidden="true">
        P
      </span>
      <span>
        <strong>PRATYUSHA</strong>
        <small>{copy.brandTagline}</small>
      </span>
    </Link>
  );
}

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function LanguageSwitcher({
  locale,
  onSwitch,
  compact = false,
}: {
  locale: Locale;
  onSwitch: (nextLocale: Locale) => void;
  compact?: boolean;
}) {
  const labels = localeLabels[locale];
  return (
    <div
      className={`language-switcher ${
        compact ? "language-switcher--compact" : ""
      }`}
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
        onClick={() => onSwitch("en")}
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
        onClick={() => onSwitch("te")}
      >
        తెలుగు
      </button>
    </div>
  );
}

export default function HomeExperience({ locale }: { locale: Locale }) {
  const copy = homeContent[locale];
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formStatus, setFormStatus] = useState<"idle" | "preview">("idle");
  const [draft, setDraft] = useState<LeadDraft>(emptyDraft);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.body.dataset.locale = locale;

    const savedLocale = window.localStorage.getItem("site_language");
    if (locale === "en" && pathname === "/" && savedLocale === "te") {
      router.replace(`/te${window.location.hash}`);
      return;
    }

    window.localStorage.setItem("site_language", locale);
    const storedDraft = window.sessionStorage.getItem("pratyusha_lead_draft");
    if (storedDraft) {
      try {
        setDraft({ ...emptyDraft, ...JSON.parse(storedDraft) });
      } catch {
        window.sessionStorage.removeItem("pratyusha_lead_draft");
      }
    }
  }, [locale, pathname, router]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    window.sessionStorage.setItem(
      "pratyusha_lead_draft",
      JSON.stringify(draft),
    );
  }, [draft]);

  const switchLanguage = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) return;
      window.localStorage.setItem("site_language", nextLocale);
      window.sessionStorage.setItem(
        "pratyusha_lead_draft",
        JSON.stringify(draft),
      );
      const hash = window.location.hash;
      router.push(`${localePath(nextLocale)}${hash}`);
      setMenuOpen(false);
    },
    [draft, locale, router],
  );

  const hiddenTracking = useMemo(() => {
    if (typeof window === "undefined") {
      return { sourceUrl: "", utmSource: "", utmMedium: "", utmCampaign: "" };
    }
    const params = new URLSearchParams(window.location.search);
    return {
      sourceUrl: window.location.href,
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
    };
  }, []);

  const changeField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.currentTarget;
    setDraft((current) => ({ ...current, [name]: value }));
    event.currentTarget.setCustomValidity("");
  };

  function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("preview");
  }

  const requiredMessage = (
    event: React.InvalidEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    event.currentTarget.setCustomValidity(copy.form.required);
  };

  return (
    <main data-locale={locale}>
      <div className="announcement">
        <p>
          <span aria-hidden="true">✦</span>
          {copy.announcement}
        </p>
        <a href="#contact">
          {copy.announcementCta} <ArrowIcon />
        </a>
      </div>

      <header className="site-header">
        <div className="container header__inner">
          <BrandMark locale={locale} />
          <nav className="desktop-nav" aria-label={copy.navLabel}>
            {copy.nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <LanguageSwitcher locale={locale} onSwitch={switchLanguage} compact />
          <a className="button button--small header__cta" href="#contact">
            {copy.headerCta} <ArrowIcon />
          </a>
          <button
            className={`menu-button ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          <nav aria-label={copy.mobileNavLabel}>
            {copy.nav.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mobile-menu__language">
            <LanguageSwitcher locale={locale} onSwitch={switchLanguage} />
          </div>
          <p>{copy.mobileNote}</p>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero__texture" aria-hidden="true" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">
              <span /> {copy.studioLabel}
            </p>
            <h1>
              {copy.heroLine1}
              <br />
              <em>{copy.heroEmphasis1}</em>
              <br />
              {copy.heroLine2}
              <br />
              <span>{copy.heroEmphasis2}</span>
            </h1>
            <p className="hero__lede">{copy.heroLede}</p>
            <div className="hero__actions">
              <a className="button" href="#contact">
                {copy.heroPrimary} <ArrowIcon />
              </a>
              <a className="text-link" href="#services">
                {copy.heroSecondary} <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero__signature">
              <span className="signature__avatar">P</span>
              <p>
                <strong>Pratyusha</strong>
                <small>Founder & Growth Partner</small>
              </p>
              <span className="signature__line" />
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__image-frame hero__image-frame--client">
              <Image
                src="/images/client-traditional-saree.webp"
                alt={copy.heroAlt}
                fill
                priority
                unoptimized
                sizes="(max-width: 800px) 92vw, 46vw"
              />
              <div className="hero__image-overlay" />
            </div>
            <div className="hero__note">
              <span>✦</span>
              <p>
                <strong>{copy.heroNoteTitle}</strong>
                {copy.heroNote}
              </p>
            </div>
            <div className="hero__monogram" aria-hidden="true">
              P
            </div>
          </div>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          <span>{copy.scroll}</span>
          <i />
        </div>
      </section>

      <section className="trust-strip" aria-label={copy.trustLabel}>
        <div className="container trust-grid">
          {copy.trustItems.map((item) => (
            <div className="trust-item" key={item.value}>
              <span>{item.value}</span>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--problem">
        <div className="container split-heading">
          <div>
            <p className="eyebrow eyebrow--light">
              <span /> {copy.problemEyebrow}
            </p>
            <h2>
              {copy.problemTitleBefore}
              <br />
              <em>{copy.problemTitleEmphasis}</em>
            </h2>
          </div>
          <p className="section-intro">{copy.problemIntro}</p>
        </div>
        <div className="container problem-list">
          {copy.problems.map((problem, index) => (
            <article key={problem}>
              <span>0{index + 1}</span>
              <p>{problem}</p>
              <i aria-hidden="true">→</i>
            </article>
          ))}
        </div>
        <div className="container problem-bridge">
          <p>{copy.problemBridge}</p>
          <strong>{copy.problemBridgeStrong}</strong>
        </div>
      </section>

      <section className="section section--solution">
        <div className="container solution-grid">
          <div className="solution-art" aria-hidden="true">
            <div className="orbit orbit--one" />
            <div className="orbit orbit--two" />
            <div className="solution-mark">P</div>
            <span className="solution-word solution-word--one">CLARITY</span>
            <span className="solution-word solution-word--two">PRESENCE</span>
            <span className="solution-word solution-word--three">GROWTH</span>
          </div>
          <div className="solution-copy">
            <p className="eyebrow">
              <span /> {copy.solutionEyebrow}
            </p>
            <h2>
              {copy.solutionTitle}
              <br />
              <em>{copy.solutionEmphasis}</em>
            </h2>
            <p>{copy.solutionBody}</p>
            <blockquote>“{copy.solutionQuote}”</blockquote>
          </div>
        </div>
      </section>

      <section className="section section--services" id="services">
        <div className="container section-heading section-heading--center">
          <p className="eyebrow">
            <span /> {copy.servicesEyebrow}
          </p>
          <h2>
            {copy.servicesTitle} <em>{copy.servicesEmphasis}</em>
          </h2>
          <p>{copy.servicesIntro}</p>
        </div>
        <div className="container service-grid">
          {copy.services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-card__top">
                <span>{service.number}</span>
                <small>{service.tag}</small>
              </div>
              <div className={`service-symbol service-symbol--${service.number}`}>
                <i />
                <b>
                  {service.number === "01"
                    ? "◌"
                    : service.number === "02"
                      ? "◇"
                      : "↗"}
                </b>
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a href="#contact" aria-label={`${copy.learnMore}: ${service.title}`}>
                {copy.learnMore} <ArrowIcon />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--benefits">
        <div className="container benefits-grid">
          <div className="benefits-heading">
            <p className="eyebrow eyebrow--light">
              <span /> {copy.benefitEyebrow}
            </p>
            <h2>
              {copy.benefitTitle}
              <br />
              <em>{copy.benefitEmphasis}</em>
            </h2>
            <p>{copy.benefitIntro}</p>
          </div>
          <div className="benefit-list">
            {copy.benefits.map((benefit, index) => (
              <article key={benefit.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--process">
        <div className="container section-heading">
          <p className="eyebrow">
            <span /> {copy.processEyebrow}
          </p>
          <h2>
            {copy.processTitle}
            <br />
            <em>{copy.processEmphasis}</em>
          </h2>
        </div>
        <div className="container process-track">
          {copy.process.map((item) => (
            <article key={item.step}>
              <div className="process-dot">
                <span>{item.step}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--about" id="about">
        <div className="container about-grid">
          <div className="about-portrait about-portrait--client">
            <Image
              src="/images/client-traditional-saree.webp"
              alt={copy.aboutAlt}
              fill
              unoptimized
              loading="lazy"
              sizes="(max-width: 800px) 92vw, 42vw"
            />
            <span>{copy.aboutBadge}</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow eyebrow--light">
              <span /> {copy.aboutEyebrow}
            </p>
            <h2>
              {copy.aboutTitle}
              <br />
              <em>{copy.aboutEmphasis}</em>
            </h2>
            <p>{copy.aboutBody1}</p>
            <p>{copy.aboutBody2}</p>
            <div className="about-values">
              {copy.aboutValues.map((value) => (
                <span key={value}>{value}</span>
              ))}
            </div>
            <p className="about-signoff">— Pratyusha</p>
          </div>
        </div>
      </section>

      <section className="section section--testimonials">
        <div className="container section-heading section-heading--center">
          <p className="eyebrow">
            <span /> {copy.testimonialsEyebrow}
          </p>
          <h2>
            {copy.testimonialsTitle}
            <br />
            <em>{copy.testimonialsEmphasis}</em>
          </h2>
        </div>
        <div className="container testimonial-grid">
          {copy.testimonials.map((testimonial, index) => (
            <figure key={testimonial.name}>
              <div className="quote-mark">“</div>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>
                <span>{testimonial.name.charAt(0)}</span>
                <p>
                  <strong>{testimonial.name}</strong>
                  <small>{testimonial.role}</small>
                </p>
              </figcaption>
              <b>0{index + 1}</b>
            </figure>
          ))}
        </div>
        <p className="preview-disclaimer">{copy.testimonialDisclaimer}</p>
      </section>

      <section className="section section--faq" id="faq">
        <div className="container faq-grid">
          <div className="faq-heading">
            <p className="eyebrow">
              <span /> {copy.faqEyebrow}
            </p>
            <h2>
              {copy.faqTitle}
              <br />
              <em>{copy.faqEmphasis}</em>
            </h2>
            <p>
              {copy.faqPrompt} <a href="#contact">{copy.faqLink}</a>
            </p>
          </div>
          <div className="accordion">
            {copy.faqs.map((faq, index) => {
              const expanded = openFaq === index;
              return (
                <article className={expanded ? "is-open" : ""} key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(expanded ? null : index)}
                    aria-expanded={expanded}
                  >
                    <span>0{index + 1}</span>
                    {faq.question}
                    <i aria-hidden="true">{expanded ? "−" : "+"}</i>
                  </button>
                  <div className="accordion__answer">
                    <p>{faq.answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="conversion">
        <div className="conversion__pattern" aria-hidden="true" />
        <div className="container conversion__inner">
          <p className="eyebrow eyebrow--light">
            <span /> {copy.conversionEyebrow}
          </p>
          <h2>
            {copy.conversionTitle}
            <br />
            <em>{copy.conversionEmphasis}</em>
          </h2>
          <p>{copy.conversionBody}</p>
          <a className="button button--gold" href="#contact">
            {copy.conversionCta} <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="section section--contact" id="contact">
        <div className="container contact-grid">
          <div className="contact-copy">
            <p className="eyebrow">
              <span /> {copy.contactEyebrow}
            </p>
            <h2>
              {copy.contactTitle}
              <br />
              <em>{copy.contactEmphasis}</em>
            </h2>
            <p>{copy.contactBody}</p>
            <div className="contact-detail">
              <span aria-hidden="true">@</span>
              <p>
                <small>{copy.emailLabel}</small>
                <strong>hello@pratyusha.example</strong>
              </p>
            </div>
            <div className="contact-detail">
              <span aria-hidden="true">⌁</span>
              <p>
                <small>{copy.locationLabel}</small>
                <strong>{copy.location}</strong>
              </p>
            </div>
            <p className="contact-note">{copy.contactNote}</p>
          </div>

          <form className="lead-form" onSubmit={submitLead}>
            <input
              type="hidden"
              name="submission_language"
              value={locale}
            />
            <input type="hidden" name="source_url" value={hiddenTracking.sourceUrl} />
            <input
              type="hidden"
              name="utm_source"
              value={hiddenTracking.utmSource}
            />
            <input
              type="hidden"
              name="utm_medium"
              value={hiddenTracking.utmMedium}
            />
            <input
              type="hidden"
              name="utm_campaign"
              value={hiddenTracking.utmCampaign}
            />
            <div className="form-heading">
              <p>{copy.formHeading}</p>
              <span>01 / 01</span>
            </div>
            <div className="form-row">
              <label>
                {copy.form.name} <b>*</b>
                <input
                  name="name"
                  type="text"
                  value={draft.name}
                  placeholder={copy.form.namePlaceholder}
                  autoComplete="name"
                  onChange={changeField}
                  onInvalid={requiredMessage}
                  required
                />
              </label>
              <label>
                {copy.form.mobile} <b>*</b>
                <input
                  name="mobile"
                  type="tel"
                  inputMode="tel"
                  value={draft.mobile}
                  placeholder="+91 00000 00000"
                  autoComplete="tel"
                  pattern="[+0-9 ()-]{8,18}"
                  onChange={changeField}
                  onInvalid={requiredMessage}
                  required
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                {copy.form.email}
                <input
                  name="email"
                  type="email"
                  value={draft.email}
                  placeholder="you@example.com"
                  autoComplete="email"
                  onChange={changeField}
                />
              </label>
              <label>
                {copy.form.city}
                <input
                  name="city"
                  type="text"
                  value={draft.city}
                  placeholder={copy.form.cityPlaceholder}
                  autoComplete="address-level2"
                  onChange={changeField}
                />
              </label>
            </div>
            <label>
              {copy.form.requirement} <b>*</b>
              <select
                name="requirement"
                value={draft.requirement}
                onChange={changeField}
                onInvalid={requiredMessage}
                required
              >
                <option value="" disabled>
                  {copy.form.requirementPlaceholder}
                </option>
                {copy.form.requirementOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {copy.form.message}
              <textarea
                name="message"
                value={draft.message}
                placeholder={copy.form.messagePlaceholder}
                rows={4}
                onChange={changeField}
              />
            </label>
            <label className="consent">
              <input
                type="checkbox"
                name="consent"
                checked={draft.consent}
                onChange={(event) => {
                  setDraft((current) => ({
                    ...current,
                    consent: event.currentTarget.checked,
                  }));
                  event.currentTarget.setCustomValidity("");
                }}
                onInvalid={requiredMessage}
                required
              />
              <span>{copy.form.consent}</span>
            </label>
            <button className="button button--full" type="submit">
              {copy.form.submit} <ArrowIcon />
            </button>
            {formStatus === "preview" && (
              <div className="form-message" role="status" aria-live="polite">
                <strong>{copy.form.successTitle}</strong>
                <span>{copy.form.successBody}</span>
              </div>
            )}
            <p className="form-privacy">{copy.form.privacy}</p>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__top">
          <BrandMark locale={locale} inverse />
          <p>{copy.footerStatement}</p>
          <a
            className="footer__up"
            href="#home"
            aria-label={copy.backToTop}
          >
            ↑
          </a>
        </div>
        <div className="container footer__grid">
          <div>
            <small>{copy.footerNav}</small>
            {copy.nav.slice(0, 4).map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <div>
            <small>{copy.footerLegal}</small>
            {copy.legalLinks.map(([label, path]) => (
              <Link key={path} href={localePath(locale, path)}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <small>{copy.footerContact}</small>
            <a href="mailto:hello@pratyusha.example">
              hello@pratyusha.example
            </a>
            <span>Hyderabad, India</span>
            <Link href="/admin">Admin</Link>
          </div>
        </div>
        <div className="container footer__bottom">
          <p>
            © {new Date().getFullYear()} Pratyusha. {copy.footerRights}
          </p>
          <p>{copy.footerNote}</p>
        </div>
      </footer>
    </main>
  );
}
