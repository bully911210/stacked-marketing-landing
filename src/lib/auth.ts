import { createHash } from "crypto";
import { cookies } from "next/headers";

const CMS_PASSWORD = process.env.CMS_PASSWORD ?? "";
const CMS_SECRET = process.env.CMS_SECRET ?? "default-secret-change-me";
const COOKIE_NAME = "cms_token";

export function generateToken(): string {
  return createHash("sha256")
    .update(CMS_PASSWORD + CMS_SECRET)
    .digest("hex");
}

export function verifyPassword(password: string): boolean {
  return password === CMS_PASSWORD;
}

export async function setAuthCookie(): Promise<void> {
  const token = generateToken();
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAuthCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return token === generateToken();
}
