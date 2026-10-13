/*
  The homepage example: one pale panel, the copy beside a small, realistic picture of a quote moving
  Request → Draft quote → Your approval → Sent. Illustrative (no client, no invented time savings);
  "Your approval" is the emphasised step, so it's clear a person stays in control. No animation.
*/
import Link from "next/link";

const ic = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
const Mail = () => <svg {...ic}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
const Doc = () => <svg {...ic}><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4M10 12h5M10 16h5" /></svg>;
const Person = () => <svg {...ic}><circle cx="10" cy="8" r="3.5" /><path d="M3.5 20c.8-3.6 3.4-5.5 6.5-5.5 1.4 0 2.6.4 3.6 1" /><path d="m15 18 2 2 4-4.5" /></svg>;
const Send = () => <svg {...ic}><path d="M21 3 10 14" /><path d="m21 3-7 18-4-7-7-4z" /></svg>;
const Line = ({ w }: { w: string }) => <i className="qf-bar" style={{ width: w }} />;

export default function QuoteExample() {
  return (
    <section className="section quote-ex" id="example">
      <div className="wrap">
        <div className="qx-panel">
          <div className="qx-copy">
            <span className="ref">Illustrative example</span>
            <h2 className="h2">Less chasing. Faster quotes.</h2>
            <p className="qx-lede">
              A customer requests a quote. Instead of copying details between emails and spreadsheets, your team gets a prepared draft to review and send.
            </p>
            <p className="qx-line">Your team stays in control. The repetitive steps get simpler.</p>
            <Link className="link" href="/transformation">See how we work →</Link>
          </div>

          <ol className="qx-flow" aria-label="How the quote moves: request, draft quote, your approval, sent">
            <li className="qf-step">
              <span className="qf-ic"><Mail /></span>
              <div className="qf-body">
                <b>Request</b>
                <div className="qf-card qf-mail" aria-hidden="true">
                  <span className="qf-meta">From: a customer · Subject: Quote request</span>
                  <span className="qf-text">Hi, could you send pricing for 40 units, delivered next month?</span>
                </div>
              </div>
            </li>
            <li className="qf-step">
              <span className="qf-ic"><Doc /></span>
              <div className="qf-body">
                <b>Draft quote</b>
                <div className="qf-card qf-quote" aria-hidden="true">
                  <span className="qf-meta">Quote · draft</span>
                  <span className="qf-row"><Line w="46%" /><Line w="16%" /></span>
                  <span className="qf-row"><Line w="38%" /><Line w="16%" /></span>
                  <span className="qf-row total"><span>Total</span><Line w="20%" /></span>
                </div>
              </div>
            </li>
            <li className="qf-step key">
              <span className="qf-ic"><Person /></span>
              <div className="qf-body">
                <b>Your approval</b>
                <span className="qf-note">A person on your team checks every quote before it goes out.</span>
                <span className="qf-actions" aria-hidden="true"><span className="qf-btn">Edit</span><span className="qf-btn on">Approve</span></span>
              </div>
            </li>
            <li className="qf-step">
              <span className="qf-ic"><Send /></span>
              <div className="qf-body">
                <b>Sent</b>
                <span className="qf-note">The customer gets the quote by email.</span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
