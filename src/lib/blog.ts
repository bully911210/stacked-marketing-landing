import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  publishDate: string;
  status: "draft" | "published" | "scheduled";
  tags: string[];
  author: string;
}

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

export function getAllPosts(): BlogPost[] {
  ensureBlogDir();
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title ?? "Untitled",
      excerpt: data.excerpt ?? "",
      content,
      coverImage: data.coverImage ?? "",
      date: data.date ?? new Date().toISOString().split("T")[0],
      publishDate: data.publishDate ?? data.date ?? new Date().toISOString(),
      status: data.status ?? "draft",
      tags: data.tags ?? [],
      author: data.author ?? "Stacked Marketing",
    } as BlogPost;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  ensureBlogDir();
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? "Untitled",
    excerpt: data.excerpt ?? "",
    content,
    coverImage: data.coverImage ?? "",
    date: data.date ?? new Date().toISOString().split("T")[0],
    publishDate: data.publishDate ?? data.date ?? new Date().toISOString(),
    status: data.status ?? "draft",
    tags: data.tags ?? [],
    author: data.author ?? "Stacked Marketing",
  };
}

export function getPublishedPosts(): BlogPost[] {
  const now = new Date();
  return getAllPosts().filter((post) => {
    if (post.status === "published") return true;
    if (post.status === "scheduled" && new Date(post.publishDate) <= now)
      return true;
    return false;
  });
}

export function savePost(post: BlogPost): void {
  ensureBlogDir();
  const frontmatter = {
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    date: post.date,
    publishDate: post.publishDate,
    status: post.status,
    tags: post.tags,
    author: post.author,
  };

  const fileContent = matter.stringify(post.content, frontmatter);
  fs.writeFileSync(path.join(BLOG_DIR, `${post.slug}.md`), fileContent);
}

export function deletePost(slug: string): boolean {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return false;
  fs.unlinkSync(filePath);
  return true;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
