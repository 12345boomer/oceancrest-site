"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CODE_COOKIE, MEMBER_COOKIE, USER_COOKIE, cookieOptions, getAccess, isValidCode, normalizeCode, safeNext } from "@/lib/access";

export interface FormState { error?: string; ok?: boolean }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function signIn(_prev: FormState, form: FormData): Promise<FormState> {
  const name = String(form.get("name") || "").trim().slice(0, 80);
  const email = String(form.get("email") || "").trim().toLowerCase().slice(0, 160);
  if (!name) return { error: "Add your name." };
  if (!EMAIL.test(email)) return { error: "That email doesn't look right." };
  const jar = await cookies();
  jar.set(USER_COOKIE, JSON.stringify({ name, email }), await cookieOptions(false));
  redirect(safeNext(form.get("next")));
}

export async function redeemCode(_prev: FormState, form: FormData): Promise<FormState> {
  const { user } = await getAccess();
  if (!user) return { error: "Sign in first, then enter the code." };
  const code = normalizeCode(String(form.get("code") || ""));
  if (!code) return { error: "Enter your access code." };
  if (!isValidCode(code)) return { error: "That code didn't work. Check it and try again." };
  const jar = await cookies();
  jar.set(CODE_COOKIE, code, await cookieOptions(true));
  jar.set(MEMBER_COOKIE, "1", await cookieOptions(false));
  const next = form.get("next");
  if (next) redirect(safeNext(next));
  return { ok: true };
}

export async function signOut(): Promise<void> {
  const jar = await cookies();
  for (const c of [USER_COOKIE, CODE_COOKIE, MEMBER_COOKIE]) jar.delete(c);
  redirect("/");
}
