import type { Metadata } from "next";
import Link from "next/link";
import AdminBilingualEditor from "./AdminBilingualEditor";

export const metadata: Metadata = {
  title: "Admin Design Preview",
  robots: { index: false, follow: false },
};

const stats = [
  ["కొత్త లీడ్స్", "12"],
  ["ఫాలో-అప్", "07"],
  ["పబ్లిష్డ్ పేజీలు", "06"],
  ["డ్రాఫ్ట్స్", "03"],
];

const leads = [
  ["సౌమ్య రెడ్డి", "Brand Clarity", "కొత్తది"],
  ["అనిల్ కుమార్", "Website", "సంప్రదించారు"],
  ["కావ్య శ్రీ", "Growth Strategy", "ఫాలో-అప్"],
];

export default function AdminPage() {
  return (
    <main className="admin-page">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <Link className="brand brand--inverse" href="/">
            <span className="brand__mark">P</span>
            <span>
              <strong>PRATYUSHA</strong>
              <small>ADMIN STUDIO</small>
            </span>
          </Link>
          <div className="admin-sidebar__nav">
            <span>▦ డాష్‌బోర్డ్</span>
            <span>◌ కంటెంట్</span>
            <span>◇ లీడ్స్</span>
            <span>□ మీడియా</span>
            <span>⌁ SEO సెట్టింగ్స్</span>
            <span>⚙ యూజర్లు & పాత్రలు</span>
          </div>
          <div className="admin-sidebar__note">
            Secure Supabase authentication and role-based access will activate
            after client credentials are available.
          </div>
        </aside>
        <section className="admin-main">
          <div className="admin-topbar">
            <div>
              <h1>శుభోదయం, Pratyusha</h1>
              <p>మీ వెబ్‌సైట్ కార్యకలాపాల సంక్షిప్త సమాచారం.</p>
            </div>
            <span className="admin-badge">DESIGN PREVIEW · READ ONLY</span>
          </div>
          <div className="admin-stats">
            {stats.map(([label, value]) => (
              <article className="admin-stat" key={label}>
                <small>{label}</small>
                <strong>{value}</strong>
              </article>
            ))}
          </div>
          <div className="admin-grid">
            <article className="admin-panel">
              <div className="admin-panel__heading">
                <h2>ఇటీవలి లీడ్స్</h2>
                <span>అన్నీ చూడండి →</span>
              </div>
              <table className="lead-table">
                <thead>
                  <tr>
                    <th>పేరు</th>
                    <th>అవసరం</th>
                    <th>స్థితి</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map(([name, need, status]) => (
                    <tr key={name}>
                      <td>{name}</td>
                      <td>{need}</td>
                      <td>
                        <span className="status-pill">{status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
            <article className="admin-panel">
              <div className="admin-panel__heading">
                <h2>త్వరిత చర్యలు</h2>
              </div>
              <div className="admin-actions">
                <div className="admin-action">
                  <p>
                    హోమ్ కంటెంట్
                    <small>Draft / publish workflow</small>
                  </p>
                  <span>→</span>
                </div>
                <div className="admin-action">
                  <p>
                    చిత్రాలు మార్చండి
                    <small>Media library</small>
                  </p>
                  <span>→</span>
                </div>
                <div className="admin-action">
                  <p>
                    లీడ్స్ ఎక్స్‌పోర్ట్
                    <small>CSV export</small>
                  </p>
                  <span>→</span>
                </div>
              </div>
            </article>
          </div>
          <div className="admin-security">
            <span>◆</span>
            ఇది విజువల్ డిజైన్ ప్రివ్యూ మాత్రమే. Supabase Auth, RLS మరియు admin
            allowlist కనెక్ట్ అయ్యే వరకు ఎడిటింగ్ ఉద్దేశపూర్వకంగా నిలిపివేయబడింది.
          </div>
          <AdminBilingualEditor />
        </section>
      </div>
    </main>
  );
}
