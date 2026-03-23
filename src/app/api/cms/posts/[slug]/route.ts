import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getPostBySlug, savePost, deletePost } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const body = await req.json();

  // If slug changed, delete old file
  const newSlug = body.slug ?? slug;
  if (newSlug !== slug) {
    deletePost(slug);
  }

  const post: BlogPost = {
    slug: newSlug,
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
  return NextResponse.json(post);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const deleted = deletePost(slug);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
