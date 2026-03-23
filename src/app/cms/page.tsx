"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { marked } from "marked";

/* ── types ── */

interface BlogPost {
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

interface UploadedImage {
  filename: string;
  url: string;
}

type View = "login" | "list" | "editor" | "images";

const emptyPost: BlogPost = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  date: new Date().toISOString().split("T")[0],
  publishDate: new Date().toISOString().slice(0, 16),
  status: "draft",
  tags: [],
  author: "Stacked Marketing",
};

/* ── helpers ── */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function statusColor(status: string): string {
  switch (status) {
    case "published":
      return "#22C55E";
    case "scheduled":
      return "#F59E0B";
    case "draft":
    default:
      return "#94A3B8";
  }
}

/* ── main CMS component ── */

export default function CMSPage() {
  const [view, setView] = useState<View>("login");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost>(emptyPost);
  const [isEditing, setIsEditing] = useState(false);
  const [originalSlug, setOriginalSlug] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft" | "scheduled">("all");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  /* ── auth ── */

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/cms/auth");
      const data = await res.json();
      if (data.authenticated) {
        setView("list");
        loadPosts();
      }
    } catch {
      // Not authenticated
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/cms/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setPassword("");
        setView("list");
        loadPosts();
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Connection error");
    }
  }

  async function handleLogout() {
    await fetch("/api/cms/auth", { method: "DELETE" });
    setView("login");
    setPosts([]);
  }

  /* ── posts CRUD ── */

  async function loadPosts() {
    const res = await fetch("/api/cms/posts");
    if (res.ok) {
      const data = await res.json();
      setPosts(data);
    }
  }

  function openNewPost() {
    setCurrentPost({ ...emptyPost, date: new Date().toISOString().split("T")[0], publishDate: new Date().toISOString().slice(0, 16) });
    setIsEditing(false);
    setOriginalSlug("");
    setShowPreview(false);
    setView("editor");
  }

  function openEditPost(post: BlogPost) {
    setCurrentPost({ ...post, publishDate: post.publishDate.slice(0, 16) });
    setIsEditing(true);
    setOriginalSlug(post.slug);
    setShowPreview(false);
    setView("editor");
  }

  async function saveCurrentPost() {
    setSaving(true);
    setError("");
    try {
      const slug = currentPost.slug || slugify(currentPost.title);
      const postData = { ...currentPost, slug };

      if (isEditing) {
        const res = await fetch(`/api/cms/posts/${originalSlug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
        if (!res.ok) throw new Error("Failed to save");
      } else {
        const res = await fetch("/api/cms/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
        if (!res.ok) throw new Error("Failed to create");
      }

      await loadPosts();
      setView("list");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function deletePost(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/cms/posts/${slug}`, { method: "DELETE" });
    if (res.ok) loadPosts();
  }

  /* ── images ── */

  async function loadImages() {
    const res = await fetch("/api/cms/upload");
    if (res.ok) setImages(await res.json());
  }

  async function uploadImage(file: File, asCover = false) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/cms/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        if (asCover) {
          setCurrentPost((p) => ({ ...p, coverImage: data.url }));
        } else {
          setCurrentPost((p) => ({
            ...p,
            content: p.content + `\n![${file.name}](${data.url})\n`,
          }));
        }
        loadImages();
      }
    } finally {
      setUploading(false);
    }
  }

  /* ── tag management ── */

  function addTag() {
    const tag = tagInput.trim();
    if (tag && !currentPost.tags.includes(tag)) {
      setCurrentPost((p) => ({ ...p, tags: [...p.tags, tag] }));
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setCurrentPost((p) => ({ ...p, tags: p.tags.filter((t) => t !== tag) }));
  }

  /* ── toolbar helpers ── */

  function insertMarkdown(prefix: string, suffix = "") {
    const textarea = document.getElementById("cms-content") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = currentPost.content.substring(start, end);
    const replacement = prefix + (selected || "text") + suffix;
    const newContent = currentPost.content.substring(0, start) + replacement + currentPost.content.substring(end);
    setCurrentPost((p) => ({ ...p, content: newContent }));
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + prefix.length;
      textarea.selectionEnd = start + prefix.length + (selected || "text").length;
    }, 0);
  }

  /* ── filter posts ── */

  const filteredPosts = posts.filter((p) => filter === "all" || p.status === filter);

  /* ── render ── */

  if (view === "login") return <LoginView password={password} setPassword={setPassword} error={error} onSubmit={handleLogin} />;

  if (view === "images") {
    return (
      <CMSShell onLogout={handleLogout} title="Image Library">
        <button onClick={() => setView("list")} style={styles.backBtn}>&larr; Back to Posts</button>
        <div style={{ marginBottom: 24 }}>
          <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={(e) => { if (e.target.files?.[0]) uploadImage(e.target.files[0]); }} />
          <button onClick={() => fileInputRef.current?.click()} style={styles.btnPrimary} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
          {images.map((img) => (
            <div key={img.filename} style={{ background: "#1A1A1A", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              <img src={img.url} alt={img.filename} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }} />
              <div style={{ padding: "8px 12px" }}>
                <p style={{ fontSize: "0.7rem", color: "#A0A0A0", wordBreak: "break-all" }}>{img.filename}</p>
                <button onClick={() => { navigator.clipboard.writeText(img.url); }} style={{ ...styles.btnSmall, marginTop: 4 }}>Copy URL</button>
              </div>
            </div>
          ))}
        </div>
        {images.length === 0 && <p style={{ color: "#666", textAlign: "center", padding: 40 }}>No images uploaded yet.</p>}
      </CMSShell>
    );
  }

  if (view === "editor") {
    const previewHtml = marked(currentPost.content || "") as string;
    return (
      <CMSShell onLogout={handleLogout} title={isEditing ? "Edit Post" : "New Post"}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <button onClick={() => setView("list")} style={styles.backBtn}>&larr; Back</button>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setShowPreview(!showPreview)} style={styles.btnGhost}>
              {showPreview ? "Editor" : "Preview"}
            </button>
            <button onClick={saveCurrentPost} disabled={saving} style={styles.btnPrimary}>
              {saving ? "Saving..." : "Save Post"}
            </button>
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {showPreview ? (
          <div style={styles.previewPane}>
            {currentPost.coverImage && (
              <img src={currentPost.coverImage} alt="Cover" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: 12, marginBottom: 24 }} />
            )}
            <h1 style={{ color: "#fff", fontFamily: "var(--font-heading)", fontSize: "2rem", marginBottom: 8 }}>{currentPost.title || "Untitled"}</h1>
            <p style={{ color: "#666", fontSize: "0.875rem", marginBottom: 24 }}>{currentPost.date} &bull; {currentPost.author}</p>
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: previewHtml }} />
            <style>{blogContentStyles}</style>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Title */}
            <div>
              <label style={styles.label}>Title</label>
              <input
                value={currentPost.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setCurrentPost((p) => ({ ...p, title, slug: isEditing ? p.slug : slugify(title) }));
                }}
                style={styles.input}
                placeholder="Post title"
              />
            </div>

            {/* Slug */}
            <div>
              <label style={styles.label}>Slug</label>
              <input value={currentPost.slug} onChange={(e) => setCurrentPost((p) => ({ ...p, slug: e.target.value }))} style={styles.input} placeholder="post-url-slug" />
            </div>

            {/* Excerpt */}
            <div>
              <label style={styles.label}>Excerpt</label>
              <textarea value={currentPost.excerpt} onChange={(e) => setCurrentPost((p) => ({ ...p, excerpt: e.target.value }))} style={{ ...styles.input, height: 80, resize: "vertical" }} placeholder="Brief description for cards and SEO" />
            </div>

            {/* Cover Image */}
            <div>
              <label style={styles.label}>Cover Image</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <input value={currentPost.coverImage} onChange={(e) => setCurrentPost((p) => ({ ...p, coverImage: e.target.value }))} style={{ ...styles.input, flex: 1, minWidth: 200 }} placeholder="/blog/images/filename.jpg" />
                <input type="file" accept="image/*" ref={coverInputRef} style={{ display: "none" }} onChange={(e) => { if (e.target.files?.[0]) uploadImage(e.target.files[0], true); }} />
                <button onClick={() => coverInputRef.current?.click()} style={styles.btnSmall} disabled={uploading}>
                  {uploading ? "..." : "Upload"}
                </button>
              </div>
              {currentPost.coverImage && (
                <img src={currentPost.coverImage} alt="Cover preview" style={{ marginTop: 12, maxWidth: 300, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)" }} />
              )}
            </div>

            {/* Status + Dates */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              <div>
                <label style={styles.label}>Status</label>
                <select value={currentPost.status} onChange={(e) => setCurrentPost((p) => ({ ...p, status: e.target.value as BlogPost["status"] }))} style={styles.input}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              <div>
                <label style={styles.label}>Date</label>
                <input type="date" value={currentPost.date} onChange={(e) => setCurrentPost((p) => ({ ...p, date: e.target.value }))} style={styles.input} />
              </div>
              <div>
                <label style={styles.label}>Publish Date {currentPost.status === "scheduled" && <span style={{ color: "#F59E0B" }}>(scheduled)</span>}</label>
                <input type="datetime-local" value={currentPost.publishDate} onChange={(e) => setCurrentPost((p) => ({ ...p, publishDate: e.target.value }))} style={styles.input} />
              </div>
            </div>

            {/* Author */}
            <div>
              <label style={styles.label}>Author</label>
              <input value={currentPost.author} onChange={(e) => setCurrentPost((p) => ({ ...p, author: e.target.value }))} style={styles.input} />
            </div>

            {/* Tags */}
            <div>
              <label style={styles.label}>Tags</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                {currentPost.tags.map((tag) => (
                  <span key={tag} style={{ background: "rgba(200,255,0,0.12)", color: "#C8FF00", fontSize: "0.75rem", fontWeight: 600, padding: "4px 12px", borderRadius: 100, display: "flex", alignItems: "center", gap: 6 }}>
                    {tag}
                    <button onClick={() => removeTag(tag)} style={{ background: "none", border: "none", color: "#C8FF00", cursor: "pointer", fontSize: "0.875rem", padding: 0, lineHeight: 1 }}>&times;</button>
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} style={{ ...styles.input, flex: 1 }} placeholder="Add a tag and press Enter" />
                <button onClick={addTag} style={styles.btnSmall}>Add</button>
              </div>
            </div>

            {/* Markdown Toolbar */}
            <div>
              <label style={styles.label}>Content (Markdown)</label>
              <div style={{ display: "flex", gap: 4, marginBottom: 8, flexWrap: "wrap" }}>
                {[
                  { label: "B", fn: () => insertMarkdown("**", "**") },
                  { label: "I", fn: () => insertMarkdown("*", "*") },
                  { label: "H2", fn: () => insertMarkdown("## ") },
                  { label: "H3", fn: () => insertMarkdown("### ") },
                  { label: "Link", fn: () => insertMarkdown("[", "](url)") },
                  { label: "Img", fn: () => fileInputRef.current?.click() },
                  { label: "UL", fn: () => insertMarkdown("- ") },
                  { label: "OL", fn: () => insertMarkdown("1. ") },
                  { label: "Quote", fn: () => insertMarkdown("> ") },
                  { label: "Code", fn: () => insertMarkdown("`", "`") },
                  { label: "HR", fn: () => insertMarkdown("\n---\n") },
                ].map((btn) => (
                  <button key={btn.label} onClick={btn.fn} style={styles.toolbarBtn}>{btn.label}</button>
                ))}
                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={(e) => { if (e.target.files?.[0]) uploadImage(e.target.files[0]); }} />
              </div>
              <textarea
                id="cms-content"
                value={currentPost.content}
                onChange={(e) => setCurrentPost((p) => ({ ...p, content: e.target.value }))}
                style={{ ...styles.input, minHeight: 400, resize: "vertical", fontFamily: "var(--font-mono)", fontSize: "0.875rem", lineHeight: 1.6 }}
                placeholder="Write your blog post in Markdown..."
              />
            </div>
          </div>
        )}
      </CMSShell>
    );
  }

  // Default: list view
  const counts = {
    all: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
    scheduled: posts.filter((p) => p.status === "scheduled").length,
  };

  return (
    <CMSShell onLogout={handleLogout} title="Blog CMS">
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 32 }}>
        {(["all", "published", "draft", "scheduled"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              background: filter === s ? "rgba(200,255,0,0.1)" : "#1A1A1A",
              border: filter === s ? "1px solid rgba(200,255,0,0.3)" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              padding: "16px 12px",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <span style={{ display: "block", fontSize: "1.5rem", fontWeight: 700, color: filter === s ? "#C8FF00" : "#fff", fontFamily: "var(--font-mono)" }}>
              {counts[s]}
            </span>
            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#A0A0A0" }}>
              {s}
            </span>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <button onClick={openNewPost} style={styles.btnPrimary}>+ New Post</button>
        <button onClick={() => { loadImages(); setView("images"); }} style={styles.btnGhost}>Image Library</button>
      </div>

      {/* Posts table */}
      {filteredPosts.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "#666" }}>
          <p style={{ fontSize: "1.125rem", marginBottom: 8 }}>No {filter === "all" ? "" : filter} posts yet</p>
          <p style={{ fontSize: "0.875rem" }}>Click &quot;+ New Post&quot; to create your first blog post.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filteredPosts.map((post) => (
            <div
              key={post.slug}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "#1A1A1A",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "16px 20px",
                flexWrap: "wrap",
              }}
            >
              {/* Cover thumb */}
              {post.coverImage ? (
                <img src={post.coverImage} alt="" style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
              ) : (
                <div style={{ width: 56, height: 56, background: "#222", borderRadius: 8, flexShrink: 0 }} />
              )}

              {/* Info */}
              <div style={{ flex: 1, minWidth: 180 }}>
                <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.9375rem", marginBottom: 4 }}>{post.title}</p>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: statusColor(post.status) }} />
                  <span style={{ color: "#A0A0A0", fontSize: "0.75rem", textTransform: "capitalize" }}>{post.status}</span>
                  <span style={{ color: "#444", fontSize: "0.5rem" }}>|</span>
                  <span style={{ color: "#666", fontSize: "0.75rem" }}>{post.date}</span>
                  {post.tags.length > 0 && (
                    <>
                      <span style={{ color: "#444", fontSize: "0.5rem" }}>|</span>
                      <span style={{ color: "#666", fontSize: "0.7rem" }}>{post.tags.join(", ")}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button onClick={() => openEditPost(post)} style={styles.btnSmall}>Edit</button>
                <button onClick={() => deletePost(post.slug)} style={{ ...styles.btnSmall, borderColor: "rgba(255,82,82,0.3)", color: "#FF5252" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </CMSShell>
  );
}

/* ── Sub-components ── */

function LoginView({ password, setPassword, error, onSubmit }: {
  password: string;
  setPassword: (v: string) => void;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0D0D0D", padding: 20 }}>
      <form onSubmit={onSubmit} style={{ width: "100%", maxWidth: 380, background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "48px 32px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem", color: "#fff", marginBottom: 4 }}>STACKED</p>
        <p style={{ color: "#666", fontSize: "0.8125rem", marginBottom: 32 }}>Blog CMS</p>

        {error && <div style={styles.error}>{error}</div>}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{ ...styles.input, marginBottom: 16, textAlign: "center" }}
          autoFocus
        />
        <button type="submit" style={{ ...styles.btnPrimary, width: "100%" }}>Log In</button>
      </form>
    </div>
  );
}

function CMSShell({ children, onLogout, title }: {
  children: React.ReactNode;
  onLogout: () => void;
  title: string;
}) {
  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0D", color: "#fff" }}>
      {/* Top bar */}
      <div style={{ background: "#111", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 0", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9375rem", color: "#C8FF00" }}>STACKED</span>
            <span style={{ color: "#333" }}>|</span>
            <span style={{ fontSize: "0.8125rem", color: "#A0A0A0" }}>{title}</span>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a href="/blog" target="_blank" style={{ color: "#A0A0A0", fontSize: "0.8125rem", textDecoration: "none" }}>View Blog &rarr;</a>
            <button onClick={onLogout} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "6px 14px", color: "#A0A0A0", fontSize: "0.75rem", cursor: "pointer" }}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {children}
      </div>
    </div>
  );
}

/* ── styles ── */

const styles: Record<string, React.CSSProperties> = {
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 10,
    color: "#fff",
    fontFamily: "var(--font-body)",
    fontSize: "0.9375rem",
    padding: "12px 16px",
    outline: "none",
  },
  label: {
    display: "block",
    color: "#A0A0A0",
    fontFamily: "var(--font-body)",
    fontWeight: 500,
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: 6,
  },
  btnPrimary: {
    background: "#C8FF00",
    color: "#0D0D0D",
    border: "none",
    borderRadius: 10,
    padding: "12px 24px",
    fontWeight: 600,
    fontSize: "0.875rem",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
  },
  btnGhost: {
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 10,
    padding: "12px 24px",
    fontWeight: 500,
    fontSize: "0.875rem",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
  },
  btnSmall: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 6,
    padding: "6px 14px",
    color: "#A0A0A0",
    fontSize: "0.75rem",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#C8FF00",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    padding: 0,
    fontFamily: "var(--font-body)",
  },
  toolbarBtn: {
    background: "#222",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 6,
    padding: "6px 12px",
    color: "#ccc",
    fontSize: "0.75rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "var(--font-mono)",
  },
  error: {
    background: "rgba(255,82,82,0.1)",
    border: "1px solid rgba(255,82,82,0.3)",
    borderRadius: 8,
    padding: "10px 16px",
    color: "#FF5252",
    fontSize: "0.8125rem",
    marginBottom: 16,
    textAlign: "center" as const,
  },
  previewPane: {
    background: "#111",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12,
    padding: 32,
    minHeight: 400,
  },
};

const blogContentStyles = `
  .blog-content { color: #A0A0A0; font-family: var(--font-body); font-size: 1rem; line-height: 1.8; }
  .blog-content h2 { color: #fff; font-size: 1.5rem; font-weight: 700; margin: 1.5em 0 0.5em; }
  .blog-content h3 { color: #fff; font-size: 1.25rem; font-weight: 600; margin: 1.5em 0 0.5em; }
  .blog-content p { margin-bottom: 1.25em; }
  .blog-content a { color: #C8FF00; }
  .blog-content ul, .blog-content ol { padding-left: 1.5em; margin-bottom: 1.25em; }
  .blog-content li { margin-bottom: 0.5em; }
  .blog-content blockquote { border-left: 3px solid #C8FF00; padding: 12px 20px; margin: 1.5em 0; background: rgba(200,255,0,0.04); border-radius: 0 8px 8px 0; }
  .blog-content img { max-width: 100%; border-radius: 8px; margin: 1.5em 0; }
  .blog-content code { font-family: var(--font-mono); background: rgba(255,255,255,0.08); padding: 2px 6px; border-radius: 4px; }
  .blog-content pre { background: #1A1A1A; border-radius: 8px; padding: 16px; overflow-x: auto; margin: 1.5em 0; }
  .blog-content strong { color: #fff; }
`;
