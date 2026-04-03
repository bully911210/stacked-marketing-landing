import type { Metadata } from "next";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog";
import { marked, Renderer } from "marked";
import Nav from "@/components/main/Nav";
import Footer from "@/components/main/Footer";
import WhatsApp from "@/components/main/WhatsApp";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Stacked Marketing Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  // Only show published or due-scheduled posts
  const now = new Date();
  if (
    post.status === "draft" ||
    (post.status === "scheduled" && new Date(post.publishDate) > now)
  ) {
    notFound();
  }

  // Sanitize: only allow known safe link protocols
  const renderer = new Renderer();
  const originalLink = renderer.link;
  renderer.link = function (token) {
    if (token.href && !/^https?:\/\/|^\/|^#|^mailto:/.test(token.href)) {
      token.href = "#";
    }
    return originalLink.call(this, token);
  };
  const htmlContent = await marked(post.content, { renderer });

  return (
    <main>
      <Nav />
      <article
        style={{
          paddingTop: "clamp(100px, 12vw, 140px)",
          paddingBottom: 80,
          backgroundColor: "var(--bg-primary)",
        }}
      >
        <div className="container-main" style={{ maxWidth: 900 }}>
          {/* Back link */}
          <Link
            href="/blog"
            style={{
              color: "var(--lime)",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 32,
            }}
          >
            &larr; Back to Blog
          </Link>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 16,
              }}
            >
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--lime)",
                    background: "var(--color-accent-muted)",
                    padding: "3px 10px",
                    borderRadius: 100,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.15,
              color: "var(--text-primary)",
              marginBottom: 16,
            }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              marginBottom: 40,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
                fontFamily: "var(--font-body)",
              }}
            >
              {post.author}
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.5rem" }}>
              ●
            </span>
            <span
              style={{
                color: "var(--text-muted)",
                fontSize: "0.875rem",
              }}
            >
              {new Date(post.date).toLocaleDateString("en-ZA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Cover image */}
          {post.coverImage && (
            <div
              style={{
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: 16,
                overflow: "hidden",
                marginBottom: 48,
                border: "1px solid var(--border)",
                position: "relative",
              }}
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </article>

      <Footer />
      <WhatsApp />

      <style>{`
        .blog-content {
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: var(--text-body);
          line-height: 1.8;
        }
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4 {
          color: var(--text-primary);
          font-family: var(--font-heading);
          margin-top: 2em;
          margin-bottom: 0.75em;
          line-height: 1.3;
        }
        .blog-content h2 { font-size: var(--text-h2); font-weight: 700; }
        .blog-content h3 { font-size: var(--text-h3); font-weight: 600; }
        .blog-content p { margin-bottom: 1.5em; }
        .blog-content a {
          color: var(--lime);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .blog-content a:hover { opacity: 0.8; }
        .blog-content ul,
        .blog-content ol {
          padding-left: 1.5em;
          margin-bottom: 1.5em;
        }
        .blog-content li { margin-bottom: 0.5em; }
        .blog-content blockquote {
          border-left: 3px solid var(--lime);
          padding: 16px 24px;
          margin: 2em 0;
          background: rgba(200, 255, 0, 0.04);
          border-radius: 0 8px 8px 0;
          color: var(--text-primary);
          font-style: italic;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 2em 0;
        }
        .blog-content code {
          font-family: var(--font-mono);
          background: rgba(255, 255, 255, 0.08);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.9em;
        }
        .blog-content pre {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px 24px;
          overflow-x: auto;
          margin: 2em 0;
        }
        .blog-content pre code {
          background: none;
          padding: 0;
        }
        .blog-content hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 3em 0;
        }
        .blog-content strong { color: var(--text-primary); }
      `}</style>
    </main>
  );
}
