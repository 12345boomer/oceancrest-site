import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Coast from "@/components/Coast";
import { SignInForm } from "@/app/account/forms";
import { getAccess, safeNext } from "@/lib/access";

export const metadata: Metadata = {
  title: "Sign in — OceanCrest AI",
  description: "Sign in to preview every OceanCrest AI course. An access code unlocks the full library."
};

type Props = { searchParams: Promise<{ next?: string }> };

export default async function Page({ searchParams }: Props) {
  const next = safeNext((await searchParams).next);
  if ((await getAccess()).user) redirect(next);
  return (
    <main id="main" className="page-account">
      <Coast as="section" seed="account-signin-cove" palette="technical" size="hero" scene="cove" className="acc-hero">
        <div className="wrap acc-wrap">
          <div className="acc-card">
            <div className="eyebrow">Learning · Sign in</div>
            <h1 className="h2">Preview every <span className="stroke">course</span>.</h1>
            <p className="acc-lede">Sign in to open the first lesson of any course. An access code unlocks the rest of the library.</p>
            <SignInForm next={next} />
            <p className="acc-fine">No password yet: we only use your name and email to keep your place. Your team has an access code? Sign in, then enter it on your account page.</p>
            <p className="acc-fine"><Link className="link" href="/courses">Browse the courses first</Link></p>
          </div>
        </div>
      </Coast>
    </main>
  );
}
