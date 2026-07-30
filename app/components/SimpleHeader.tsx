import Link from "next/link";

export default function SimpleHeader() {
  return (
    <header className="simple-header">
      <div className="container simple-header__inner">
        <Link className="brand" href="/">
          <span className="brand__mark" aria-hidden="true">
            P
          </span>
          <span>
            <strong>PRATYUSHA</strong>
            <small>CLARITY · PRESENCE · GROWTH</small>
          </span>
        </Link>
        <Link href="/">← హోమ్‌కు తిరిగి వెళ్లండి</Link>
      </div>
    </header>
  );
}
