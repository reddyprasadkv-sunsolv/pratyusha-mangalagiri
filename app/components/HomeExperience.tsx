"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  benefits,
  faqs,
  navItems,
  problems,
  processSteps,
  services,
  testimonials,
  trustItems,
} from "../content";

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`brand ${inverse ? "brand--inverse" : ""}`} href="/#home">
      <span className="brand__mark" aria-hidden="true">
        P
      </span>
      <span>
        <strong>PRATYUSHA</strong>
        <small>CLARITY · PRESENCE · GROWTH</small>
      </span>
    </Link>
  );
}

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function HomeExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formStatus, setFormStatus] = useState<"idle" | "preview">("idle");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("preview");
  }

  return (
    <main>
      <div className="announcement">
        <p>
          <span aria-hidden="true">✦</span>
          మీ వ్యాపారం గురించి 30 నిమిషాల పరిచయ సంభాషణ
        </p>
        <a href="#contact">సమయం బుక్ చేసుకోండి <ArrowIcon /></a>
      </div>

      <header className="site-header">
        <div className="container header__inner">
          <BrandMark />
          <nav className="desktop-nav" aria-label="ప్రధాన నావిగేషన్">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="button button--small header__cta" href="#contact">
            మాట్లాడదాం <ArrowIcon />
          </a>
          <button
            className={`menu-button ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "మెనూ మూసివేయండి" : "మెనూ తెరవండి"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          <nav aria-label="మొబైల్ నావిగేషన్">
            {navItems.map((item, index) => (
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
          <p>మీ ఆలోచనను అందమైన, నమ్మకమైన బ్రాండ్‌గా మార్చుకుందాం.</p>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero__texture" aria-hidden="true" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">
              <span /> TELUGU BUSINESS GROWTH STUDIO
            </p>
            <h1>
              మీ ఆలోచనకు
              <br />
              <em>సరైన రూపం.</em>
              <br />
              మీ వ్యాపారానికి
              <br />
              <span>స్థిరమైన ఎదుగుదల.</span>
            </h1>
            <p className="hero__lede">
              మీ కథను అర్థం చేసుకుని, మీ బ్రాండ్‌ను స్పష్టంగా, అందంగా,
              నమ్మకంగా ప్రపంచానికి పరిచయం చేసే భాగస్వామ్యం.
            </p>
            <div className="hero__actions">
              <a className="button" href="#contact">
                ఉచిత పరిచయ సంభాషణ <ArrowIcon />
              </a>
              <a className="text-link" href="#services">
                మా విధానం తెలుసుకోండి <span aria-hidden="true">↓</span>
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
            <div className="hero__image-frame">
              <img
                src="/pratyusha-hero.webp"
                alt="ఆత్మవిశ్వాసంతో ఉన్న భారతీయ మహిళా వ్యాపారవేత్త"
                width="1536"
                height="1024"
                fetchPriority="high"
              />
              <div className="hero__image-overlay" />
            </div>
            <div className="hero__note">
              <span>✦</span>
              <p>
                <strong>Clarity before creativity.</strong>
                ప్రతి అందమైన బ్రాండ్ వెనుక ఒక స్పష్టమైన ఆలోచన ఉంటుంది.
              </p>
            </div>
            <div className="hero__monogram" aria-hidden="true">
              P
            </div>
          </div>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          <span>SCROLL TO DISCOVER</span>
          <i />
        </div>
      </section>

      <section className="trust-strip" aria-label="మా ప్రత్యేకతలు">
        <div className="container trust-grid">
          {trustItems.map((item) => (
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
              <span /> ఇది మీకు పరిచయంగా అనిపిస్తుందా?
            </p>
            <h2>
              మీలో సామర్థ్యం ఉంది.
              <br />
              కానీ <em>స్పష్టత</em> లేదా?
            </h2>
          </div>
          <p className="section-intro">
            మంచి వ్యాపారం ఉండటం ఒక్కటే సరిపోదు. దాని విలువను సరైన వ్యక్తులకు
            సరైన విధంగా చూపించగలగాలి.
          </p>
        </div>
        <div className="container problem-list">
          {problems.map((problem, index) => (
            <article key={problem}>
              <span>0{index + 1}</span>
              <p>{problem}</p>
              <i aria-hidden="true">→</i>
            </article>
          ))}
        </div>
        <div className="container problem-bridge">
          <p>మీరు ఒంటరిగా అన్నీ తెలుసుకోవాల్సిన అవసరం లేదు.</p>
          <strong>మీకు కావాల్సింది—సరైన దిశ చూపించే భాగస్వామి.</strong>
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
              <span /> మా దృక్పథం
            </p>
            <h2>
              అందంగా కనిపించడం మాత్రమే కాదు.
              <br />
              <em>అర్థవంతంగా పనిచేయాలి.</em>
            </h2>
            <p>
              మీ వ్యాపారం వెనుక ఉన్న ఉద్దేశాన్ని, మీ కస్టమర్ల అవసరాన్ని,
              మార్కెట్‌లో మీ ప్రత్యేకతను కలిపి—నమ్మకాన్ని పెంచే బ్రాండ్
              అనుభవాన్ని నిర్మిస్తాం.
            </p>
            <blockquote>
              “వ్యూహం లేని డిజైన్ అలంకరణ మాత్రమే. స్పష్టతతో కూడిన డిజైన్
              ఎదుగుదలకు పునాది.”
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section section--services" id="services">
        <div className="container section-heading section-heading--center">
          <p className="eyebrow">
            <span /> మీ ఎదుగుదల ప్రయాణంలో
          </p>
          <h2>
            ప్రతి దశకు <em>స్పష్టమైన సహకారం</em>
          </h2>
          <p>మీకు అవసరం లేని సంక్లిష్టత లేకుండా, అవసరమైన దానిపై దృష్టి.</p>
        </div>
        <div className="container service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-card__top">
                <span>{service.number}</span>
                <small>{service.tag}</small>
              </div>
              <div className={`service-symbol service-symbol--${service.number}`}>
                <i />
                <b>{service.number === "01" ? "◌" : service.number === "02" ? "◇" : "↗"}</b>
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a href="#contact" aria-label={`${service.title} గురించి మాట్లాడండి`}>
                మరింత తెలుసుకోండి <ArrowIcon />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--benefits">
        <div className="container benefits-grid">
          <div className="benefits-heading">
            <p className="eyebrow eyebrow--light">
              <span /> మీరు పొందేది
            </p>
            <h2>
              ఒక వెబ్‌సైట్ కంటే
              <br />
              <em>ఎక్కువ.</em>
            </h2>
            <p>
              ప్రతి నిర్ణయం వెనుక స్పష్టత. ప్రతి డిజైన్ వెనుక ఉద్దేశం. ప్రతి
              అడుగు వెనుక మీ ఎదుగుదల.
            </p>
          </div>
          <div className="benefit-list">
            {benefits.map((benefit, index) => (
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
            <span /> మనం కలిసి ఎలా పనిచేస్తాం
          </p>
          <h2>
            గందరగోళం నుంచి
            <br />
            <em>స్పష్టమైన ముందడుగుకు.</em>
          </h2>
        </div>
        <div className="container process-track">
          {processSteps.map((item) => (
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
          <div className="about-portrait">
            <img
              src="/pratyusha-hero.webp"
              alt="Pratyusha సంస్థ వ్యవస్థాపకురాలు"
              width="1536"
              height="1024"
              loading="lazy"
            />
            <span>YOUR GROWTH PARTNER</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow eyebrow--light">
              <span /> Pratyusha గురించి
            </p>
            <h2>
              మీ వ్యాపారాన్ని
              <br />
              <em>మీలా చూసే</em> భాగస్వామి.
            </h2>
            <p>
              ప్రతి వ్యాపారం వెనుక ఒక వ్యక్తిగత కథ ఉంటుంది. ఆ కథను శ్రద్ధగా
              విని, అందులోని విలువను గుర్తించి, ప్రపంచానికి నమ్మకంగా
              చూపించడమే మా పని.
            </p>
            <p>
              పెద్ద మాటలు, ఒకేలా ఉండే పరిష్కారాలకంటే—మీ పరిస్థితికి సరిపోయే
              స్పష్టమైన ఆలోచనలను, అందమైన అమలును మేము నమ్ముతాం.
            </p>
            <div className="about-values">
              <span>శ్రద్ధ</span>
              <span>స్పష్టత</span>
              <span>నిజాయితీ</span>
              <span>నాణ్యత</span>
            </div>
            <p className="about-signoff">— Pratyusha</p>
          </div>
        </div>
      </section>

      <section className="section section--testimonials">
        <div className="container section-heading section-heading--center">
          <p className="eyebrow">
            <span /> కలిసి ఎదిగిన కథలు
          </p>
          <h2>
            నమ్మకం నుంచి మొదలైన
            <br />
            <em>అందమైన మార్పులు</em>
          </h2>
        </div>
        <div className="container testimonial-grid">
          {testimonials.map((testimonial, index) => (
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
        <p className="preview-disclaimer">
          గమనిక: పై టెస్టిమోనియల్స్ డిజైన్ ప్రివ్యూ కోసం నమూనా కంటెంట్.
        </p>
      </section>

      <section className="section section--faq" id="faq">
        <div className="container faq-grid">
          <div className="faq-heading">
            <p className="eyebrow">
              <span /> సాధారణ ప్రశ్నలు
            </p>
            <h2>
              మీ మనసులో ఉన్న
              <br />
              <em>ప్రశ్నలకు సమాధానాలు</em>
            </h2>
            <p>
              మీ ప్రశ్న ఇక్కడ కనిపించలేదా?
              <a href="#contact"> మాతో నేరుగా మాట్లాడండి.</a>
            </p>
          </div>
          <div className="accordion">
            {faqs.map((faq, index) => {
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
            <span /> మీ తదుపరి అడుగు
          </p>
          <h2>
            మీ ఆలోచన గురించి మాట్లాడదాం.
            <br />
            <em>అది ఎక్కడికి వెళ్లగలదో చూద్దాం.</em>
          </h2>
          <p>
            ఎలాంటి ఒత్తిడి లేదు. మీ ప్రస్తుత పరిస్థితిని అర్థం చేసుకుని,
            తదుపరి సరైన అడుగును కలిసి గుర్తించే పరిచయ సంభాషణ.
          </p>
          <a className="button button--gold" href="#contact">
            సంభాషణ ప్రారంభిద్దాం <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="section section--contact" id="contact">
        <div className="container contact-grid">
          <div className="contact-copy">
            <p className="eyebrow">
              <span /> సంప్రదించండి
            </p>
            <h2>
              మీ కథను
              <br />
              <em>వినడానికి సిద్ధంగా ఉన్నాం.</em>
            </h2>
            <p>
              ఈ చిన్న ఫారమ్‌లో వివరాలు పంచుకోండి. మీ అవసరాన్ని అర్థం చేసుకుని,
              సాధారణంగా 1–2 పనిదినాల్లో స్పందిస్తాం.
            </p>
            <div className="contact-detail">
              <span aria-hidden="true">@</span>
              <p>
                <small>EMAIL</small>
                <strong>hello@pratyusha.example</strong>
              </p>
            </div>
            <div className="contact-detail">
              <span aria-hidden="true">⌁</span>
              <p>
                <small>BASED IN</small>
                <strong>Hyderabad · Serving Worldwide</strong>
              </p>
            </div>
            <p className="contact-note">
              సంప్రదింపు వివరాలు క్లయింట్ నుంచి వచ్చిన తర్వాత అప్‌డేట్ అవుతాయి.
            </p>
          </div>

          <form className="lead-form" onSubmit={submitLead}>
            <div className="form-heading">
              <p>మీ వివరాలు</p>
              <span>01 / 01</span>
            </div>
            <div className="form-row">
              <label>
                మీ పేరు <b>*</b>
                <input
                  name="name"
                  type="text"
                  placeholder="మీ పూర్తి పేరు"
                  autoComplete="name"
                  required
                />
              </label>
              <label>
                మొబైల్ నంబర్ <b>*</b>
                <input
                  name="mobile"
                  type="tel"
                  inputMode="tel"
                  placeholder="+91 00000 00000"
                  autoComplete="tel"
                  pattern="[+0-9 ()-]{8,18}"
                  required
                />
              </label>
            </div>
            <label>
              ఇమెయిల్
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>
            <label>
              మీకు ఏ సహాయం కావాలి? <b>*</b>
              <select name="requirement" defaultValue="" required>
                <option value="" disabled>
                  ఒక ఎంపికను ఎంచుకోండి
                </option>
                <option value="brand">బ్రాండ్ స్పష్టత</option>
                <option value="website">వెబ్‌సైట్ / డిజిటల్ ప్రెజెన్స్</option>
                <option value="growth">గ్రోత్ వ్యూహం</option>
                <option value="other">ఇతర అవసరం</option>
              </select>
            </label>
            <label>
              మీ ఆలోచన గురించి కొంచెం చెప్పండి
              <textarea
                name="message"
                placeholder="మీ వ్యాపారం, ప్రస్తుత సవాలు, మీ లక్ష్యం..."
                rows={4}
              />
            </label>
            <label className="consent">
              <input type="checkbox" required />
              <span>
                నా వివరాలను ఈ అభ్యర్థనకు స్పందించేందుకు ఉపయోగించడానికి
                అంగీకరిస్తున్నాను.
              </span>
            </label>
            <button className="button button--full" type="submit">
              వివరాలు పంపండి <ArrowIcon />
            </button>
            {formStatus === "preview" && (
              <div className="form-message" role="status">
                <strong>డిజైన్ ప్రివ్యూ సిద్ధంగా ఉంది.</strong>
                <span>
                  Supabase కనెక్షన్ వచ్చిన తర్వాత ఈ ఫారమ్ సురక్షితంగా లీడ్‌ను
                  సేవ్ చేస్తుంది.
                </span>
              </div>
            )}
            <p className="form-privacy">
              మీ సమాచారం గోప్యంగా ఉంటుంది. స్పామ్ చేయము.
            </p>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__top">
          <BrandMark inverse />
          <p>
            మీ ఆలోచనకు స్పష్టత.
            <br />
            మీ బ్రాండ్‌కు ప్రత్యేకత.
            <br />
            మీ వ్యాపారానికి ఎదుగుదల.
          </p>
          <a className="footer__up" href="#home" aria-label="పేజీ పైకి వెళ్లండి">
            ↑
          </a>
        </div>
        <div className="container footer__grid">
          <div>
            <small>నావిగేషన్</small>
            {navItems.slice(0, 4).map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <div>
            <small>చట్టపరమైనవి</small>
            <Link href="/privacy-policy">గోప్యతా విధానం</Link>
            <Link href="/terms-and-conditions">నిబంధనలు & షరతులు</Link>
            <Link href="/refund-cancellation-policy">రిఫండ్ విధానం</Link>
            <Link href="/disclaimer">నిరాకరణ</Link>
            <Link href="/cookie-policy">కుకీ విధానం</Link>
          </div>
          <div>
            <small>సంప్రదించండి</small>
            <a href="mailto:hello@pratyusha.example">
              hello@pratyusha.example
            </a>
            <span>Hyderabad, India</span>
            <Link href="/admin">Admin</Link>
          </div>
        </div>
        <div className="container footer__bottom">
          <p>© {new Date().getFullYear()} Pratyusha. All rights reserved.</p>
          <p>తెలుగు వ్యాపారాల ఎదుగుదల కోసం శ్రద్ధతో రూపొందించబడింది.</p>
        </div>
      </footer>
    </main>
  );
}
