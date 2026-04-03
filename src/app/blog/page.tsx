import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/blog";
import Nav from "@/components/main/Nav";
import Footer from "@/components/main/Footer";
import WhatsApp from "@/components/main/WhatsApp";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog | Stacked Marketing",
  description:
    "Marketing insights, tips, and strategies from the Stacked Marketing team.",
};

export const revalidate = 60;

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <main>
      <Nav />
      <section
        className="section-spacing"
        style={{ paddingTop: "clamp(120px, 15vw, 180px)", backgroundColor: "var(--bg-primary)" }}
      >
        <div className="container-main">
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-caption)",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--lime)",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            OUR BLOG
          </p>
          <h1
            className="text-display"
            style={{ textAlign: "center", marginBottom: 16 }}
          >
            Marketing Insights
          </h1>
          <p
            style={{
              textAlign: "center",
              color: "var(--text-secondary)",
              fontSize: "var(--text-body-lg)",
              maxWidth: 600,
              margin: "0 auto 64px",
              lineHeight: 1.6,
            }}
          >
            Tips, strategies, and stories from the trenches of digital marketing.
          </p>

          {posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "1.125rem" }}>
                No posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
                gap: 24,
              }}
            >
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <article
                    className="card"
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                      padding: 0,
                    }}
                  >
                    {post.coverImage && (
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "16/9",
                          overflow: "hidden",
                          borderRadius: "16px 16px 0 0",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 340px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    )}
                    <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                      {post.tags.length > 0 && (
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                          {post.tags.slice(0, 3).map((tag) => (
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
                      <h2
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 700,
                          fontSize: "var(--text-h3)",
                          color: "var(--text-primary)",
                          marginBottom: 8,
                          lineHeight: 1.3,
                        }}
                      >
                        {post.title}
                      </h2>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.875rem",
                          lineHeight: 1.6,
                          flex: 1,
                          marginBottom: 16,
                        }}
                      >
                        {post.excerpt}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                          {new Date(post.date).toLocaleDateString("en-ZA", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span
                          style={{
                            color: "var(--lime)",
                            fontSize: "0.8125rem",
                            fontWeight: 600,
                          }}
                        >
                          Read more &rarr;
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
      <WhatsApp />
    </main>
  );
}
