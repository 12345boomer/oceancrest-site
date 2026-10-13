"use client";
/*
  The "next one ships" sign-up. No backend in this build: validate, thank, chime.
  TODO(owner): post to the live Netlify form.
*/
import { useState } from "react";
import type { FormEvent } from "react";
import { sparkle } from "@/lib/sea";

export default function SubscribeForm() {
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const btn = e.currentTarget.querySelector('button[type="submit"]');
    if (btn) sparkle(btn);
    setSent(true);
  }
  return (
    <>
      <form className="sub-form" id="sub-form" onSubmit={onSubmit} hidden={sent}>
        <label>
          Email, required
          <input type="email" name="email" required autoComplete="email" placeholder="you@company.com" />
        </label>
        <label>
          Name, optional
          <input type="text" name="name" autoComplete="name" placeholder="Your name" />
        </label>
        <button type="submit" className="btn primary">Tell me when the next one ships</button>
        <p className="fine">We use this for that one email and nothing else.</p>
      </form>
      <div className="thanks" id="sub-thanks" role="status" aria-live="polite" hidden={!sent}>
        <span className="pebble sm" aria-hidden="true">✓</span>
        <span>Thanks — we&apos;ll send one email when the next one ships.</span>
      </div>
    </>
  );
}
