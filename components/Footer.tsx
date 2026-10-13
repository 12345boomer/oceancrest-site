import Link from "next/link";
import Coast from "@/components/Coast";
import { LIVE, READINESS } from "@/lib/site";

const Ext = () => <span aria-hidden="true">↗</span>;

export default function Footer() {
  return (
    <footer className="site-foot">
      <Coast className="foot-art" seed="footer-shore" palette="hero" size="wide" scene="beach" aria-hidden="true" />
      <div className="wrap">
        <div className="cols">
          <div className="brand">
            <img src="/assets/img/logos/oceancrest-ai-lockup-rgb-navy.svg" alt="OceanCrest AI" width={216} height={25} />
            <p>We help businesses simplify everyday work with AI, and teach their teams to use it confidently. The consulting division of OceanCrest Ventures.</p>
          </div>
          <div>
            <h4>Transformation</h4>
            <ul>
              <li><Link href="/transformation">The partnership</Link></li>
              <li><Link href="/transformation#phases">Assess, build, measure</Link></li>
              <li><Link href="/transformation#options">Ways to start</Link></li>
              <li><a href={READINESS} target="_blank" rel="noopener">Assess your business <Ext /></a></li>
              <li><a href={`${LIVE}/case-001/`} target="_blank" rel="noopener">The demonstration case <Ext /></a></li>
            </ul>
          </div>
          <div>
            <h4>Education</h4>
            <ul>
              <li><Link href="/education">The learning solution</Link></li>
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/diagnostic">Check your AI skills</Link></li>
              <li><Link href="/education#platform">The platform</Link></li>
              <li><Link href="/education#workshops">Workshops</Link></li>
              <li><Link href="/education#membership">Membership</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/about#advisory">Advisory board</Link></li>
              <li><Link href="/resources">Resources</Link></li>
              <li><Link href="/book">Book a meeting</Link></li>
              <li><a href="https://oceancrestventures.com" target="_blank" rel="noopener">OceanCrest Ventures <Ext /></a></li>
            </ul>
          </div>
        </div>
        <div className="fine">
          <span>© 2026 OceanCrest Ventures. All rights reserved. Engagements are contracted through Ocean Crest Consulting LLC.</span>
          <span>Team and advisor photographs are of the people named. Ocean imagery is AI-generated or painted by code and depicts no real place.</span>
        </div>
      </div>
    </footer>
  );
}
