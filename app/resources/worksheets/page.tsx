import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ClosingCall from "@/components/ClosingCall";
import { courseById } from "@/lib/courses";
import { PointersSection, SubscribeSection } from "../sections";
import "../page.css";

export const metadata: Metadata = {
  title: "Worksheets — OceanCrest AI",
  description: "Worksheets are in preparation. Subscribe for one email when the first one ships, and use the templates or check your AI skills in the meantime."
};

export default function Page() {
  const deck = courseById("pitch-deck");
  return (
    <main id="main" className="page-resources page-worksheets">
      <PageHero image="/assets/img/heroes/worksheets.jpg" video="/assets/video/sub-worksheets.mp4"
        seed="worksheets-hero"
        palette="mindset"
        eyebrow="Resources · Worksheets"
        title={<>Worksheets are in <span className="stroke sun">preparation</span>.</>}
        lede="None is published yet, and none has a date. Subscribe and we'll send one email when the first one ships."
      >
        <a className="btn primary" href="#subscribe">Notify me <span className="arr" aria-hidden="true">↓</span></a>
      </PageHero>
      <PointersSection
        eyebrow="Available now"
        title={<>What you can use <span className="stroke">today</span>.</>}
        items={[
          {
            seed: "worksheets-templates", palette: "technical", scene: "cove", tag: "Templates",
            title: "Templates.",
            text: "Ready-to-use files with AI prompts built in.",
            href: "/courses?cat=templates", cta: "See the templates →"
          },
          ...(deck ? [{
            seed: "worksheets-pitch-deck", palette: "technical" as const, scene: "open" as const, tag: "Template",
            title: deck.title + ".",
            text: deck.blurb,
            href: `/courses/${deck.id}`, cta: "See the template →"
          }] : []),
          {
            seed: "worksheets-diagnostic", palette: "mindset", scene: "headland", tag: "Skills check",
            title: "Check your AI skills.",
            text: "Find out what you know about AI, and what you don't yet. Fifteen short questions, about five minutes. Free, no sign-up.",
            href: "/diagnostic", cta: "Check your AI skills →"
          }
        ]}
      />
      <SubscribeSection flush={false} />
      <ClosingCall seed="worksheets-final" />
    </main>
  );
}
