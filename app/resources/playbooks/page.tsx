import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ClosingCall from "@/components/ClosingCall";
import { PointersSection, SubscribeSection } from "../sections";
import "../page.css";

export const metadata: Metadata = {
  title: "Playbooks — OceanCrest AI",
  description: "Playbooks are in preparation. Subscribe for one email when the first one ships, and read the white papers or take a department course in the meantime."
};

export default function Page() {
  return (
    <main id="main" className="page-resources page-playbooks">
      <PageHero image="/assets/img/heroes/playbooks.jpg" video="/assets/video/sub-playbooks.mp4"
        seed="playbooks-hero"
        palette="hero"
        eyebrow="Resources · Playbooks"
        title={<>Playbooks are in <span className="stroke sun">preparation</span>.</>}
        lede="None is published yet, and none has a date. Subscribe and we'll send one email when the first one ships."
      >
        <a className="btn primary" href="#subscribe">Notify me <span className="arr" aria-hidden="true">↓</span></a>
      </PageHero>
      <PointersSection
        eyebrow="Available now"
        title={<>What you can read <span className="stroke">today</span>.</>}
        items={[
          {
            seed: "playbooks-papers", palette: "technical", scene: "cove", tag: "White papers",
            title: "The papers behind how we work.",
            text: "The engagement model, in four phases, and your next ninety days. Four letter sheets each, free.",
            href: "/resources/white-papers", cta: "Read the papers →"
          },
          {
            seed: "playbooks-department", palette: "technical", scene: "beach", tag: "Courses",
            title: "By department.",
            text: "AI applied to the work a specific team does.",
            href: "/courses?cat=department", cta: "See the courses →"
          }
        ]}
      />
      <SubscribeSection flush={false} />
      <ClosingCall seed="playbooks-final" />
    </main>
  );
}
