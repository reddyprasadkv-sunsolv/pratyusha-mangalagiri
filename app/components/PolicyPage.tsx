import { policies, type PolicyKey } from "../content";
import SimpleHeader from "./SimpleHeader";

export default function PolicyPage({ policyKey }: { policyKey: PolicyKey }) {
  const policy = policies[policyKey];
  return (
    <main>
      <SimpleHeader />
      <section className="policy-hero">
        <div className="container">
          <p className="eyebrow">
            <span /> {policy.eyebrow}
          </p>
          <h1>{policy.title}</h1>
          <p>{policy.intro}</p>
          <span className="draft-badge">
            క్లయింట్ సమీక్షకు డ్రాఫ్ట్ కంటెంట్
          </span>
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
          <span>చివరి నవీకరణ: 30 జూలై 2026</span>
          <span>ప్రశ్నలు: hello@pratyusha.example</span>
        </div>
      </section>
    </main>
  );
}
