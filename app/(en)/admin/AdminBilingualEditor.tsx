"use client";

import Image from "next/image";
import { useState } from "react";

const initialFields = {
  en: {
    title: "Give your idea a clear expression. Give your business room to grow.",
    description:
      "A thoughtful partnership that presents your brand with clarity, beauty, and confidence.",
    cta: "Begin a conversation",
    alt: "Professional portrait of the founder in an elegant traditional saree",
  },
  te: {
    title: "మీ ఆలోచనకు సరైన రూపం. మీ వ్యాపారానికి స్థిరమైన ఎదుగుదల.",
    description:
      "మీ కథను అర్థం చేసుకుని, మీ బ్రాండ్‌ను స్పష్టంగా, అందంగా, నమ్మకంగా ప్రపంచానికి పరిచయం చేసే భాగస్వామ్యం.",
    cta: "సంభాషణ ప్రారంభిద్దాం",
    alt: "సాంప్రదాయ చీరలో సంస్థ వ్యవస్థాపకురాలి వృత్తిపరమైన చిత్రం",
  },
};

export default function AdminBilingualEditor() {
  const [locale, setLocale] = useState<"en" | "te">("en");
  const [fields, setFields] = useState(initialFields);
  const active = fields[locale];

  const updateField = (key: keyof typeof active, value: string) => {
    setFields((current) => ({
      ...current,
      [locale]: { ...current[locale], [key]: value },
    }));
  };

  return (
    <section className="admin-editor">
      <div className="admin-editor__heading">
        <div>
          <small>CONTENT MANAGEMENT · DESIGN PREVIEW</small>
          <h2>Hero Section</h2>
          <p>Separate fields, validation, preview, and publishing per language.</p>
        </div>
        <span className="admin-badge">DRAFT · NOT PUBLIC</span>
      </div>
      <div className="admin-language-tabs" role="tablist" aria-label="Content language">
        <button
          type="button"
          role="tab"
          aria-selected={locale === "en"}
          className={locale === "en" ? "is-active" : ""}
          onClick={() => setLocale("en")}
        >
          English <span>Complete</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={locale === "te"}
          className={locale === "te" ? "is-active" : ""}
          onClick={() => setLocale("te")}
        >
          తెలుగు <span>Review needed</span>
        </button>
      </div>
      <div className="admin-editor__grid">
        <div className="admin-content-form">
          <label>
            {locale === "en" ? "English heading" : "తెలుగు శీర్షిక"}
            <textarea
              rows={3}
              value={active.title}
              onChange={(event) => updateField("title", event.currentTarget.value)}
            />
            <small>{active.title.length} / 110 characters</small>
          </label>
          <label>
            {locale === "en" ? "English description" : "తెలుగు వివరణ"}
            <textarea
              rows={4}
              value={active.description}
              onChange={(event) =>
                updateField("description", event.currentTarget.value)
              }
            />
          </label>
          <label>
            {locale === "en" ? "Button text" : "బటన్ టెక్స్ట్"}
            <input
              value={active.cta}
              onChange={(event) => updateField("cta", event.currentTarget.value)}
            />
          </label>
          <label>
            {locale === "en" ? "Image alt text" : "చిత్రం ప్రత్యామ్నాయ టెక్స్ట్"}
            <input
              value={active.alt}
              onChange={(event) => updateField("alt", event.currentTarget.value)}
            />
          </label>
          <div className="admin-workflow">
            <button type="button" disabled>
              Save Draft
            </button>
            <a href={locale === "en" ? "/" : "/te"} target="_blank">
              Preview
            </a>
            <button type="button" disabled>
              Publish
            </button>
            <button type="button" disabled>
              Unpublish
            </button>
          </div>
          <p className="admin-field-note">
            Saving and publishing remain locked until Supabase Auth and the admin
            allowlist are connected.
          </p>
        </div>
        <aside className="admin-media-preview">
          <div className="admin-media-preview__image">
            <Image
              src="/images/client-traditional-saree.webp"
              alt={active.alt}
              fill
              unoptimized
              sizes="320px"
            />
          </div>
          <h3>Founder portrait</h3>
          <p>WebP · 1023 × 1537 · 199 KB</p>
          <div className="admin-media-actions">
            <button type="button" disabled>Replace image</button>
            <button type="button" disabled>Set focal point</button>
            <button type="button" disabled>Archive</button>
          </div>
          <small>
            MIME, extension, file size, dimensions, secure filename, and storage
            permissions are validated before publication.
          </small>
        </aside>
      </div>
      <div className="admin-editor__meta">
        <span>Last updated: 30 July 2026, 10:20 PM</span>
        <span>Updated by: Setup administrator</span>
        <span>English fallback: Disabled</span>
      </div>
    </section>
  );
}
