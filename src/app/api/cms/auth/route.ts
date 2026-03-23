import { NextRequest, NextResponse } from "next/server";
import {
  verifyPassword,
  setAuthCookie,
  clearAuthCookie,
  isAuthenticated,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { password } = body;

  if (!password || !verifyPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  await setAuthCookie();
  return NextResponse.json({ success: true });
}

export async function GET() {
  const authed = await isAuthenticated();
  return NextResponse.json({ authenticated: authed });
}

export async function DELETE() {
  await clearAuthCookie();
  return NextResponse.json({ success: true });
}
