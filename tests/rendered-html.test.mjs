import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${process.pid}-${Date.now()}-${encodeURIComponent(pathname)}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function htmlFor(pathname) {
  const response = await render(pathname);
  assert.equal(response.status, 200, `${pathname} should render successfully`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("renders English as the default language with a visible language switcher", async () => {
  const html = await htmlFor("/");

  assert.match(html, /<html lang="en">/);
  assert.match(html, /<main data-locale="en">/);
  assert.match(html, /English selected/);
  assert.match(html, /Switch website language to Telugu/);
  assert.match(html, />తెలుగు</);
  assert.match(html, /Give your idea/);
  assert.match(html, /Full Name/);
  assert.match(html, /Mobile Number/);
  assert.match(html, /Submit enquiry/);
});

test("renders the Telugu experience and localized lead form", async () => {
  const html = await htmlFor("/te");

  assert.match(html, /<html lang="te">/);
  assert.match(html, /<main data-locale="te">/);
  assert.match(html, /తెలుగు ఎంపిక చేయబడింది/);
  assert.match(html, /వెబ్‌సైట్ భాషను ఆంగ్లంలోకి మార్చండి/);
  assert.match(html, /మీ ఆలోచనకు/);
  assert.match(html, /పూర్తి పేరు/);
  assert.match(html, /మొబైల్ నంబర్/);
  assert.match(html, /విచారణను పంపండి/);
});

test("language switching persists preference and retains the lead draft", async () => {
  const source = await readFile(
    new URL("../app/components/HomeExperience.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /onClick=\{\(\) => onSwitch\("en"\)\}/);
  assert.match(source, /onClick=\{\(\) => onSwitch\("te"\)\}/);
  assert.match(source, /localStorage\.getItem\("site_language"\)/);
  assert.match(source, /localStorage\.setItem\("site_language", nextLocale\)/);
  assert.match(source, /router\.push\(`\$\{localePath\(nextLocale\)\}\$\{hash\}`\)/);
  assert.match(source, /sessionStorage\.getItem\([\s\S]*pratyusha_lead_draft/);
  assert.match(source, /sessionStorage\.setItem\([\s\S]*JSON\.stringify\(draft\)/);
});

test("English and Telugu legal routes render independently", async () => {
  const englishRoutes = [
    "/privacy-policy",
    "/terms-and-conditions",
    "/refund-cancellation-policy",
    "/disclaimer",
    "/cookie-policy",
  ];
  const teluguRoutes = englishRoutes.map((route) => `/te${route}`);

  for (const route of englishRoutes) {
    const html = await htmlFor(route);
    assert.match(html, /<html lang="en">/);
    assert.match(html, /Draft content for client and legal review/);
  }

  for (const route of teluguRoutes) {
    const html = await htmlFor(route);
    assert.match(html, /<html lang="te">/);
    assert.match(html, /క్లయింట్ మరియు న్యాయ సమీక్షకు డ్రాఫ్ట్ కంటెంట్/);
  }
});

test("uses the approved optimized traditional saree portrait in both languages", async () => {
  const imageUrl = new URL(
    "../public/images/client-traditional-saree.webp",
    import.meta.url,
  );
  const [image, imageStats, english, telugu, source] = await Promise.all([
    readFile(imageUrl),
    stat(imageUrl),
    htmlFor("/"),
    htmlFor("/te"),
    readFile(new URL("../app/components/HomeExperience.tsx", import.meta.url), "utf8"),
  ]);

  assert.equal(image.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(image.subarray(8, 12).toString("ascii"), "WEBP");
  assert.ok(imageStats.size < 500_000, "portrait should remain web optimized");
  assert.match(english, /client-traditional-saree\.webp/);
  assert.match(telugu, /client-traditional-saree\.webp/);
  assert.match(english, /Professional portrait of the founder in an elegant traditional saree/);
  assert.match(telugu, /సాంప్రదాయ చీరలో సంస్థ వ్యవస్థాపకురాలి వృత్తిపరమైన చిత్రం/);
  assert.doesNotMatch(source, /pratyusha-hero|blazer/i);
  assert.match(source, /sizes="\(max-width: 800px\) 92vw, 46vw"/);
  assert.match(source, /sizes="\(max-width: 800px\) 92vw, 42vw"/);
});

test("navigation, FAQ, and enquiry validation expose accessible controls", async () => {
  const html = await htmlFor("/");

  assert.match(html, /<nav class="desktop-nav" aria-label="Primary navigation">/);
  assert.match(html, /<nav aria-label="Mobile navigation">/);
  assert.match(html, /aria-label="Open menu" aria-expanded="false"/);
  assert.match(html, /class="accordion"/);
  assert.match(html, /aria-expanded="true"/);
  assert.match(
    html,
    /<input(?=[^>]*name="name")(?=[^>]*type="text")(?=[^>]*required)[^>]*>/,
  );
  assert.match(
    html,
    /<input(?=[^>]*name="mobile")(?=[^>]*type="tel")(?=[^>]*required)[^>]*>/,
  );
  assert.match(
    html,
    /<select(?=[^>]*name="requirement")(?=[^>]*required)[^>]*>/,
  );
  assert.match(
    html,
    /<input(?=[^>]*type="checkbox")(?=[^>]*name="consent")(?=[^>]*required)[^>]*>/,
  );
});

test("public CMS views exclude drafts and direct anonymous lead access", async () => {
  const migration = await readFile(
    new URL("../supabase/migrations/20260730153000_bilingual_cms.sql", import.meta.url),
    "utf8",
  );

  assert.match(migration, /where status_en = 'published'/);
  assert.match(migration, /where status_te = 'published'/);
  assert.match(migration, /revoke all on public\.leads from anon/);
  assert.doesNotMatch(migration, /grant insert on public\.leads to anon/);
  assert.doesNotMatch(migration, /Public can submit consented bilingual leads/);
  assert.match(migration, /using \(public\.is_cms_admin\(\)\)/);
  assert.match(migration, /consent_status = true/);
  assert.match(migration, /char_length\(message\) <= 2000/);
});

test("the public application has no appointment-booking component or route", async () => {
  const files = await readdir(new URL("../app/", import.meta.url), {
    recursive: true,
  });
  const publicPaths = files.map(String).join("\n");

  assert.doesNotMatch(publicPaths, /appointment|booking/i);
  const html = await htmlFor("/");
  assert.doesNotMatch(html, /appointment|book an appointment/i);
});
