import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";

/*
  Who can see what, without an outside service (Ben, 2026-10-08: no Supabase until it's needed).
  - Anyone: the catalog and every course page.
  - Signed in (name + email, no password yet): lesson 1 of every course, the preview.
  - Access code entered: every lesson.

  There is one access code. Only its SHA-256 fingerprint is in the code base; to change it, set
  ACCESS_CODE_SHA256 (hex) in the environment. The code a visitor entered is kept in an httpOnly
  cookie and re-checked against the fingerprint on every request, so changing the code locks
  everyone out again. Signing in is a convenience, not security: it only gates the preview.
*/

const DEFAULT_CODE_SHA256 = "c8daa07f41d8c32d1c0d7a1527ba415a7ba7cd942d047dcfa10f000de20352fa";

export const USER_COOKIE = "oc_user";     // readable by the page: { name, email }
export const CODE_COOKIE = "oc_access";   // httpOnly: the code as entered
export const MEMBER_COOKIE = "oc_member"; // readable by the page: "1" (display only; the server re-checks the code)

export interface Visitor { name: string; email: string }
export interface Access { user: Visitor | null; member: boolean }

export const normalizeCode = (code: string) => code.trim().toUpperCase().replace(/\s+/g, "");

export function isValidCode(code: string): boolean {
  const want = Buffer.from((process.env.ACCESS_CODE_SHA256 || DEFAULT_CODE_SHA256).trim().toLowerCase(), "hex");
  const got = createHash("sha256").update(normalizeCode(code)).digest();
  return want.length === got.length && timingSafeEqual(want, got);
}

export function parseVisitor(raw: string | undefined): Visitor | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as Partial<Visitor>;
    return typeof v.email === "string" && v.email.includes("@") ? { name: String(v.name || ""), email: v.email } : null;
  } catch {
    return null;
  }
}

export async function getAccess(): Promise<Access> {
  const jar = await cookies();
  const user = parseVisitor(jar.get(USER_COOKIE)?.value);
  const code = jar.get(CODE_COOKIE)?.value;
  return { user, member: !!user && !!code && isValidCode(code) };
}

/** Cookie options: Secure whenever the request came over https (always on Netlify). */
export async function cookieOptions(httpOnly: boolean) {
  const h = await headers();
  const secure = h.get("x-forwarded-proto") === "https" || process.env.NETLIFY === "true";
  return { httpOnly, secure, sameSite: "lax" as const, path: "/", maxAge: 60 * 60 * 24 * 365 };
}

/** Only same-site paths are allowed as a place to return to after signing in. */
export const safeNext = (next: unknown, fallback = "/courses") =>
  typeof next === "string" && next.startsWith("/") && !next.startsWith("//") ? next : fallback;
