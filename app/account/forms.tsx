"use client";

import { useActionState } from "react";
import { redeemCode, signIn, type FormState } from "./actions";

/** Name + email sign-in. `next` is where to go afterwards. */
export function SignInForm({ next }: { next: string }) {
  const [state, action, busy] = useActionState<FormState, FormData>(signIn, {});
  return (
    <form className="acc-form" action={action}>
      <input type="hidden" name="next" value={next} />
      <label><span className="ref">Your name</span><input name="name" autoComplete="name" required maxLength={80} /></label>
      <label><span className="ref">Work email</span><input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
      {state.error && <p className="acc-err" role="alert">{state.error}</p>}
      <button className="btn primary" type="submit" disabled={busy}>
        {busy ? "Signing in…" : <>Sign in <span className="arr" aria-hidden="true">→</span></>}
      </button>
    </form>
  );
}

/** The access code box. With `next`, a correct code goes straight there. */
export function CodeForm({ next }: { next?: string }) {
  const [state, action, busy] = useActionState<FormState, FormData>(redeemCode, {});
  if (state.ok) return <p className="acc-ok" role="status">Every course is unlocked. Enjoy the library.</p>;
  return (
    <form className="acc-form code" action={action}>
      {next && <input type="hidden" name="next" value={next} />}
      <label><span className="ref">Access code</span><input name="code" autoComplete="off" autoCapitalize="characters" spellCheck={false} placeholder="OCEAN-XXXX-XXXX-XXXX" required maxLength={40} /></label>
      {state.error && <p className="acc-err" role="alert">{state.error}</p>}
      <button className="btn primary" type="submit" disabled={busy} data-sparkle="">
        {busy ? "Checking…" : <>Unlock every course <span className="arr" aria-hidden="true">→</span></>}
      </button>
    </form>
  );
}
