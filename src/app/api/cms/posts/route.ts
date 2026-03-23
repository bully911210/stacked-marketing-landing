import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllPosts, savePost, slugify } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const posts = getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const slug = body.slug || slugify(body.title || "untitled");

  const post: BlogPost = {
    slug,
    title: body.title ?? "Untitled",
    excerpt: body.excerpt ?? "",
    content: body.content ?? "",
    coverImage: body.coverImage ?? "",
    date: body.date ?? new Date().toISOString().split("T")[0],
    publishDate: body.publishDate ?? new Date().toISOString(),
    status: body.status ?? "draft",
    tags: body.tags ?? [],
    author: body.author ?? "Stacked Marketing",
  };

  savePost(post);
  return NextResponse.json(post, { status: 201 });
}
