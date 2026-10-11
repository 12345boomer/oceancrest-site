import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Coast from "@/components/Coast";
import { CodeForm } from "./forms";
import { signOut } from "./actions";
import { getAccess, safeNext } from "@/lib/access";

export const metadata: Metadata = { title: "Your account — OceanCrest AI", description: "Your course access at OceanCrest AI." };

type Props = { searchParams: Promise<{ next?: string }> };

export default async function Page({ searchParams }: Props) {
  const sp = await searchParams;
  const { user, member } = await getAccess();
  if (!user) redirect("/login?next=" + encodeURIComponent("/account" + (sp.next ? "?next=" + encodeURIComponent(sp.next) : "")));
  const next = sp.next ? safeNext(sp.next) : undefined;
  return (
    <main id="main" className="page-account">
      <Coast as="section" seed="account-harbour" palette="technical" size="hero" scene="headland" className="acc-hero">
        <div className="wrap acc-wrap">
          <div className="acc-card">
            <div className="eyebrow">Learning · Your account</div>
            <h1 className="h2">Hello, {user.name.split(" ")[0] || "there"}.</h1>
            <p className="acc-lede">Signed in as {user.email}.</p>
            <div className={"acc-status" + (member ? " on" : "")}>
              <span className="ref">Your access</span>
              <b>{member ? "Full library: every lesson of every course." : "Preview: the first lesson of every course."}</b>
            </div>
            {member ? (
              <div className="btns"><Link className="btn primary" href={next || "/courses"}>{next ? "Back to the lesson" : "Go to the courses"} <span className="arr" aria-hidden="true">→</span></Link></div>
            ) : (
              <>
                <p className="acc-fine" style={{ marginTop: 18 }}>Have an access code from OceanCrest AI? Enter it to unlock every course.</p>
                <CodeForm next={next} />
                <p className="acc-fine">No code yet? <Link className="link" href="/book?about=learning">Talk to us about access</Link>.</p>
              </>
            )}
            <form action={signOut} className="acc-out"><button className="link" type="submit">Sign out</button></form>
          </div>
        </div>
      </Coast>
    </main>
  );
}
