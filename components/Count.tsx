/*
  <Count to={80} suffix="%+" />: a figure that counts up when it scrolls into view (components/Enhancers).
  The final figure is in the HTML from the start: screen readers read the hidden copy, and the visible
  copy only animates for people who haven't asked for reduced motion. Without JavaScript it simply shows.
*/
export default function Count({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const text = prefix + to + suffix;
  return (
    <span data-count={to} data-prefix={prefix || undefined} data-suffix={suffix || undefined}>
      <span className="sr">{text}</span>
      <span className="ct" aria-hidden="true">{text}</span>
    </span>
  );
}
