"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ── types ── */

interface LineItem {
  description: string;
  detail: string;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientBusiness: string;
  items: LineItem[];
  subtotal: number;
  vat: number;
  total: number;
  status: "unpaid" | "paid";
  paidDate: string | null;
  createdAt: string;
  dueDate: string;
  notes: string;
}

type View = "login" | "list" | "create" | "preview";

/* ── preset services ── */

const SERVICE_PRESETS: { label: string; description: string; detail: string; amount: number }[] = [
  {
    label: "Basic WordPress Website",
    description: "Basic WordPress Website",
    detail: "Design, development, and deployment of a responsive WordPress website with up to 5 pages, mobile optimised, basic SEO setup, contact form, and WhatsApp integration.",
    amount: 2499,
  },
  {
    label: "Basic Custom Website",
    description: "Basic Custom Website",
    detail: "Custom-coded responsive website built on Next.js with up to 5 pages, mobile optimised, on-page SEO, contact form, WhatsApp integration, and Vercel hosting setup.",
    amount: 2499,
  },
  {
    label: "Basic Performance Advertising Management",
    description: "Basic Performance Advertising Management",
    detail: "Monthly Meta (Facebook & Instagram) advertising management including campaign strategy, audience research, ad creative direction, A/B testing, lead tracking, and monthly performance reporting.",
    amount: 4999,
  },
  {
    label: "Custom Line Item",
    description: "",
    detail: "",
    amount: 0,
  },
];

/* ── banking details (placeholder for user to fill in) ── */

const BANKING_DETAILS = {
  bankName: "Capitec",
  accountHolder: "Stacked Marketing",
  accountNumber: "2522959642",
  branchCode: "470010",
  accountType: "Cheque Account",
  reference: "Invoice Number",
};

/* ── saved clients ── */

interface SavedClient {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientBusiness: string;
}

const DEFAULT_CLIENTS: SavedClient[] = [
  {
    clientName: "Moira Kloppers",
    clientBusiness: "Idille Bemarking",
    clientEmail: "idille.bemarking@gmail.com",
    clientPhone: "082 480 3338",
  },
  {
    clientName: "Dawid Botha",
    clientBusiness: "Waardevast Finansiële Advieseursdienste",
    clientEmail: "",
    clientPhone: "+27 84 777 0945",
  },
  {
    clientName: "Johannes Stoker",
    clientBusiness: "SIG Solutions",
    clientEmail: "johannes@sigsolutions.co.za",
    clientPhone: "+27 84 607 4324",
  },
];

function getSavedClients(): SavedClient[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("stacked_saved_clients");
    if (raw) return JSON.parse(raw);
    // Seed defaults on first use
    localStorage.setItem("stacked_saved_clients", JSON.stringify(DEFAULT_CLIENTS));
    return DEFAULT_CLIENTS;
  } catch {
    return DEFAULT_CLIENTS;
  }
}

function saveClient(client: SavedClient) {
  const clients = getSavedClients();
  const exists = clients.findIndex(
    (c) => c.clientName === client.clientName && c.clientBusiness === client.clientBusiness
  );
  if (exists >= 0) {
    clients[exists] = client;
  } else {
    clients.push(client);
  }
  localStorage.setItem("stacked_saved_clients", JSON.stringify(clients));
}

/* ── helpers ── */

function formatCurrency(amount: number): string {
  return `R${amount.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ── PDF generation ── */

function generateInvoicePDF(invoice: Invoice) {
  const html = `
    <html>
    <head>
      <title>Invoice ${invoice.invoiceNumber}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; padding: 40px; max-width: 800px; margin: 0 auto; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px; border-bottom: 3px solid #C8FF00; padding-bottom: 24px; }
        .brand h1 { font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
        .brand p { color: #666; font-size: 13px; margin-top: 4px; }
        .invoice-meta { text-align: right; }
        .invoice-meta h2 { font-size: 32px; font-weight: 700; color: #0D0D0D; }
        .invoice-meta .inv-num { font-size: 16px; color: #666; margin-top: 4px; }
        .invoice-meta .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-top: 8px; }
        .status-paid { background: #22C55E20; color: #16A34A; }
        .status-unpaid { background: #EF444420; color: #DC2626; }
        .parties { display: flex; justify-content: space-between; margin-bottom: 40px; }
        .party h3 { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 8px; }
        .party p { font-size: 14px; line-height: 1.6; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
        thead th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999; padding: 12px 8px; border-bottom: 2px solid #eee; }
        thead th:last-child { text-align: right; }
        tbody td { padding: 16px 8px; border-bottom: 1px solid #f0f0f0; font-size: 14px; vertical-align: top; }
        tbody td:last-child { text-align: right; font-weight: 500; white-space: nowrap; }
        .item-desc { font-weight: 600; }
        .item-detail { color: #666; font-size: 12px; margin-top: 4px; line-height: 1.5; }
        .totals { margin-left: auto; width: 280px; }
        .totals .row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
        .totals .row.total { border-top: 2px solid #0D0D0D; font-size: 18px; font-weight: 700; padding-top: 12px; margin-top: 4px; }
        .banking { margin-top: 48px; padding: 24px; background: #f9f9f9; border-radius: 8px; }
        .banking h3 { font-size: 14px; font-weight: 700; margin-bottom: 12px; }
        .banking p { font-size: 13px; line-height: 1.8; color: #444; }
        .banking .ref-note { margin-top: 12px; padding: 12px; background: #FEF3C7; border-radius: 6px; font-weight: 600; color: #92400E; font-size: 13px; }
        .notes { margin-top: 24px; padding: 16px; border-left: 3px solid #C8FF00; background: #fafafa; border-radius: 0 8px 8px 0; }
        .notes h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 8px; }
        .notes p { font-size: 13px; color: #444; line-height: 1.6; }
        .footer { margin-top: 48px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 24px; }
        @media print {
          body { padding: 20px; }
          .banking { break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="brand">
          <h1>Stacked Marketing</h1>
          <p>Pretoria, South Africa</p>
          <p>+27 62 177 9799</p>
          <p>hello@stackedmarketing.co.za</p>
        </div>
        <div class="invoice-meta">
          <h2>INVOICE</h2>
          <div class="inv-num">${invoice.invoiceNumber}</div>
          <span class="status ${invoice.status === "paid" ? "status-paid" : "status-unpaid"}">${invoice.status === "paid" ? "PAID" : "UNPAID"}</span>
        </div>
      </div>

      <div class="parties">
        <div class="party">
          <h3>Bill To</h3>
          <p><strong>${invoice.clientName}</strong></p>
          ${invoice.clientBusiness ? `<p>${invoice.clientBusiness}</p>` : ""}
          ${invoice.clientEmail ? `<p>${invoice.clientEmail}</p>` : ""}
          ${invoice.clientPhone ? `<p>${invoice.clientPhone}</p>` : ""}
        </div>
        <div class="party" style="text-align: right;">
          <h3>Invoice Details</h3>
          <p><strong>Date:</strong> ${formatDate(invoice.createdAt)}</p>
          <p><strong>Due Date:</strong> ${formatDate(invoice.dueDate)}</p>
          ${invoice.status === "paid" && invoice.paidDate ? `<p><strong>Paid:</strong> ${formatDate(invoice.paidDate)}</p>` : ""}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width:60%">Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items
            .map(
              (item) => `
            <tr>
              <td>
                <div class="item-desc">${item.description}</div>
                ${item.detail ? `<div class="item-detail">${item.detail}</div>` : ""}
              </td>
              <td>${formatCurrency(item.amount)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <div class="totals">
        <div class="row total"><span>Total Due</span><span>${formatCurrency(invoice.total)}</span></div>
      </div>

      <div class="banking">
        <h3>Banking Details</h3>
        <p>
          <strong>Bank:</strong> ${BANKING_DETAILS.bankName}<br/>
          <strong>Account Holder:</strong> ${BANKING_DETAILS.accountHolder}<br/>
          <strong>Account Number:</strong> ${BANKING_DETAILS.accountNumber}<br/>
          <strong>Branch Code:</strong> ${BANKING_DETAILS.branchCode}<br/>
          <strong>Account Type:</strong> ${BANKING_DETAILS.accountType}
        </p>
        <div class="ref-note">
          Payment Reference: Please use the invoice number <strong>${invoice.invoiceNumber}</strong> as your payment reference.
        </div>
      </div>

      ${
        invoice.notes
          ? `<div class="notes"><h3>Notes</h3><p>${invoice.notes}</p></div>`
          : ""
      }

      <div style="margin-top: 48px; padding: 24px; background: linear-gradient(135deg, #0D0D0D, #1a1a1a); border: 1px solid #C8FF0040; border-radius: 10px; text-align: center;">
        <p style="font-size: 15px; font-weight: 600; color: #C8FF00; margin-bottom: 6px;">Need more from your online presence?</p>
        <p style="font-size: 13px; color: #888; line-height: 1.6;">Stacked Marketing offers website design, performance advertising, SEO &amp; more.<br/>Get in touch for a free consultation.</p>
        <p style="margin-top: 12px; font-size: 13px;"><a href="https://www.stackedmarketing.co.za" style="color: #C8FF00; text-decoration: none; font-weight: 600;">www.stackedmarketing.co.za</a> &nbsp;&middot;&nbsp; <a href="https://wa.me/27621779799" style="color: #C8FF00; text-decoration: none; font-weight: 600;">WhatsApp Us</a></p>
      </div>

      <div class="footer">
        <p>Stacked Marketing &middot; Pretoria, South Africa &middot; www.stackedmarketing.co.za</p>
      </div>
    </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  }
}

/* ── main component ── */

export default function InvoicingPage() {
  const [view, setView] = useState<View>("login");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<"all" | "paid" | "unpaid">("all");
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);

  /* ── form state ── */
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientBusiness, setClientBusiness] = useState("");
  const [items, setItems] = useState<LineItem[]>([]);
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState("");

  const formRef = useRef<HTMLDivElement>(null);

  /* ── auth ── */

  const handleLogin = async () => {
    setError("");
    const res = await fetch("/api/cms/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setView("list");
      loadInvoices();
    } else {
      setError("Invalid password");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/cms/auth", { method: "DELETE" });
    setView("login");
    setInvoices([]);
  };

  /* ── data ── */

  const loadInvoices = useCallback(async () => {
    try {
      const res = await fetch("/api/invoices");
      if (res.ok) {
        setInvoices(await res.json());
      } else if (res.status === 401) {
        setView("login");
      }
    } catch {
      // Network or parse error — invoices list stays as-is
    }
  }, []);

  useEffect(() => {
    fetch("/api/cms/auth")
      .then((r) => {
        if (!r.ok) return null;
        return r.json();
      })
      .then((d) => {
        if (d?.authenticated) {
          setView("list");
          loadInvoices();
        }
      })
      .catch(() => {});
  }, [loadInvoices]);

  /* ── actions ── */

  const addPresetItem = (presetIndex: number) => {
    const preset = SERVICE_PRESETS[presetIndex];
    setItems([
      ...items,
      { description: preset.description, detail: preset.detail, amount: preset.amount },
    ]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof LineItem, value: string | number) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const resetForm = () => {
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setClientBusiness("");
    setItems([]);
    setDueDate(new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0]);
    setNotes("");
    setError("");
  };

  const handleCreate = async () => {
    setError("");

    if (!clientName.trim()) {
      setError("Client name is required");
      return;
    }
    if (items.length === 0) {
      setError("Add at least one line item");
      return;
    }
    if (items.some((i) => !i.description.trim() || i.amount <= 0)) {
      setError("All items need a description and amount greater than R0");
      return;
    }

    setSaving(true);
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientName,
        clientEmail,
        clientPhone,
        clientBusiness,
        items,
        dueDate,
        notes,
      }),
    });

    if (res.ok) {
      const inv = await res.json();
      saveClient({ clientName, clientEmail, clientPhone, clientBusiness });
      setSavedClients(getSavedClients());
      resetForm();
      setPreviewInvoice(inv);
      setView("preview");
      loadInvoices();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to create invoice");
    }
    setSaving(false);
  };

  const toggleStatus = async (invoice: Invoice) => {
    const newStatus = invoice.status === "paid" ? "unpaid" : "paid";
    const res = await fetch(`/api/invoices/${invoice.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) loadInvoices();
  };

  const handleDelete = async (invoice: Invoice) => {
    if (!confirm(`Delete invoice ${invoice.invoiceNumber}?`)) return;
    const res = await fetch(`/api/invoices/${invoice.id}`, { method: "DELETE" });
    if (res.ok) loadInvoices();
  };

  /* ── computed ── */

  const filteredInvoices = invoices.filter((inv) => {
    if (filter === "all") return true;
    return inv.status === filter;
  });

  const subtotal = items.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
  const total = subtotal;

  /* ── saved clients ── */
  const [savedClients, setSavedClients] = useState<SavedClient[]>([]);

  useEffect(() => {
    setSavedClients(getSavedClients());
  }, []);

  const loadSavedClient = (index: number) => {
    const client = savedClients[index];
    if (!client) return;
    setClientName(client.clientName);
    setClientEmail(client.clientEmail);
    setClientPhone(client.clientPhone);
    setClientBusiness(client.clientBusiness);
  };

  const totalOutstanding = invoices
    .filter((i) => i.status === "unpaid")
    .reduce((sum, i) => sum + i.total, 0);

  const totalReceived = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.total, 0);

  /* ── styles ── */

  const S = {
    page: {
      minHeight: "100vh",
      background: "#0D0D0D",
      color: "#fff",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    } as React.CSSProperties,
    container: {
      maxWidth: 1100,
      margin: "0 auto",
      padding: "40px 20px",
    } as React.CSSProperties,
    card: {
      background: "#1A1A1A",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.08)",
      padding: 24,
      marginBottom: 16,
    } as React.CSSProperties,
    input: {
      width: "100%",
      padding: "10px 14px",
      background: "#141414",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 8,
      color: "#fff",
      fontSize: 14,
      outline: "none",
      fontFamily: "inherit",
    } as React.CSSProperties,
    textarea: {
      width: "100%",
      padding: "10px 14px",
      background: "#141414",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 8,
      color: "#fff",
      fontSize: 14,
      outline: "none",
      fontFamily: "inherit",
      minHeight: 80,
      resize: "vertical" as const,
    } as React.CSSProperties,
    label: {
      display: "block",
      fontSize: 12,
      color: "#A0A0A0",
      marginBottom: 6,
      textTransform: "uppercase" as const,
      letterSpacing: "0.5px",
      fontWeight: 500,
    } as React.CSSProperties,
    btnPrimary: {
      padding: "12px 24px",
      background: "#C8FF00",
      color: "#0D0D0D",
      border: "none",
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit",
    } as React.CSSProperties,
    btnSecondary: {
      padding: "10px 20px",
      background: "transparent",
      color: "#A0A0A0",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 8,
      fontSize: 14,
      cursor: "pointer",
      fontFamily: "inherit",
    } as React.CSSProperties,
    btnDanger: {
      padding: "6px 12px",
      background: "transparent",
      color: "#EF4444",
      border: "1px solid rgba(239,68,68,0.3)",
      borderRadius: 6,
      fontSize: 12,
      cursor: "pointer",
      fontFamily: "inherit",
    } as React.CSSProperties,
    badge: (status: string) =>
      ({
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase" as const,
        letterSpacing: "0.5px",
        background: status === "paid" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
        color: status === "paid" ? "#22C55E" : "#EF4444",
      }) as React.CSSProperties,
  };

  /* ── LOGIN VIEW ── */

  if (view === "login") {
    return (
      <div style={S.page}>
        <div
          style={{
            ...S.container,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <div style={{ ...S.card, maxWidth: 400, width: "100%" }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Invoicing</h1>
            <p style={{ color: "#A0A0A0", fontSize: 14, marginBottom: 24 }}>
              Enter password to continue
            </p>
            {error && (
              <p style={{ color: "#EF4444", fontSize: 13, marginBottom: 12 }}>{error}</p>
            )}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={{ ...S.input, marginBottom: 16 }}
            />
            <button onClick={handleLogin} style={{ ...S.btnPrimary, width: "100%" }}>
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── PREVIEW VIEW ── */

  if (view === "preview" && previewInvoice) {
    return (
      <div style={S.page}>
        <div style={S.container}>
          <div style={{ display: "flex", gap: 12, marginBottom: 32, alignItems: "center" }}>
            <button
              onClick={() => { setView("list"); setPreviewInvoice(null); }}
              style={S.btnSecondary}
            >
              &larr; Back to Invoices
            </button>
            <button
              onClick={() => generateInvoicePDF(previewInvoice)}
              style={S.btnPrimary}
            >
              Download / Print PDF
            </button>
            <span style={S.badge(previewInvoice.status)}>{previewInvoice.status}</span>
          </div>

          <div style={{ ...S.card, padding: 40 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40, paddingBottom: 20, borderBottom: "2px solid #C8FF00" }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700 }}>Stacked Marketing</h1>
                <p style={{ color: "#A0A0A0", fontSize: 13, marginTop: 4 }}>Pretoria, South Africa</p>
                <p style={{ color: "#A0A0A0", fontSize: 13 }}>+27 62 177 9799</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <h2 style={{ fontSize: 28, fontWeight: 700 }}>INVOICE</h2>
                <p style={{ color: "#A0A0A0", fontSize: 14, marginTop: 4 }}>{previewInvoice.invoiceNumber}</p>
                <span style={{ ...S.badge(previewInvoice.status), marginTop: 8 }}>{previewInvoice.status}</span>
              </div>
            </div>

            {/* Parties */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40 }}>
              <div>
                <p style={{ fontSize: 11, textTransform: "uppercase", color: "#666", letterSpacing: 1, marginBottom: 8 }}>Bill To</p>
                <p style={{ fontWeight: 600 }}>{previewInvoice.clientName}</p>
                {previewInvoice.clientBusiness && <p style={{ color: "#A0A0A0", fontSize: 14 }}>{previewInvoice.clientBusiness}</p>}
                {previewInvoice.clientEmail && <p style={{ color: "#A0A0A0", fontSize: 14 }}>{previewInvoice.clientEmail}</p>}
                {previewInvoice.clientPhone && <p style={{ color: "#A0A0A0", fontSize: 14 }}>{previewInvoice.clientPhone}</p>}
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 11, textTransform: "uppercase", color: "#666", letterSpacing: 1, marginBottom: 8 }}>Details</p>
                <p style={{ fontSize: 14 }}><span style={{ color: "#666" }}>Date:</span> {formatDate(previewInvoice.createdAt)}</p>
                <p style={{ fontSize: 14 }}><span style={{ color: "#666" }}>Due:</span> {formatDate(previewInvoice.dueDate)}</p>
                {previewInvoice.paidDate && <p style={{ fontSize: 14, color: "#22C55E" }}>Paid: {formatDate(previewInvoice.paidDate)}</p>}
              </div>
            </div>

            {/* Items */}
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 32 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <th style={{ textAlign: "left", padding: "12px 8px", fontSize: 11, textTransform: "uppercase", color: "#666", letterSpacing: 1 }}>Description</th>
                  <th style={{ textAlign: "right", padding: "12px 8px", fontSize: 11, textTransform: "uppercase", color: "#666", letterSpacing: 1 }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {previewInvoice.items.map((item, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "16px 8px" }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{item.description}</div>
                      {item.detail && <div style={{ color: "#A0A0A0", fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>{item.detail}</div>}
                    </td>
                    <td style={{ textAlign: "right", padding: "16px 8px", fontWeight: 500, fontSize: 14, whiteSpace: "nowrap" }}>{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div style={{ marginLeft: "auto", width: 280 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", fontSize: 20, fontWeight: 700, borderTop: "2px solid rgba(255,255,255,0.2)", marginTop: 4 }}>
                <span>Total</span><span style={{ color: "#C8FF00" }}>{formatCurrency(previewInvoice.total)}</span>
              </div>
            </div>

            {/* Banking */}
            <div style={{ marginTop: 40, padding: 24, background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Banking Details</h3>
              <div style={{ fontSize: 13, lineHeight: 1.8, color: "#A0A0A0" }}>
                <p><strong style={{ color: "#fff" }}>Bank:</strong> {BANKING_DETAILS.bankName}</p>
                <p><strong style={{ color: "#fff" }}>Account Holder:</strong> {BANKING_DETAILS.accountHolder}</p>
                <p><strong style={{ color: "#fff" }}>Account Number:</strong> {BANKING_DETAILS.accountNumber}</p>
                <p><strong style={{ color: "#fff" }}>Branch Code:</strong> {BANKING_DETAILS.branchCode}</p>
                <p><strong style={{ color: "#fff" }}>Account Type:</strong> {BANKING_DETAILS.accountType}</p>
              </div>
              <div style={{ marginTop: 12, padding: 12, background: "rgba(200,255,0,0.08)", borderRadius: 6, border: "1px solid rgba(200,255,0,0.2)" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#C8FF00" }}>
                  Payment Reference: Please use the invoice number <strong>{previewInvoice.invoiceNumber}</strong> as your payment reference.
                </p>
              </div>
            </div>

            {previewInvoice.notes && (
              <div style={{ marginTop: 24, padding: 16, borderLeft: "3px solid #C8FF00", background: "rgba(255,255,255,0.02)", borderRadius: "0 8px 8px 0" }}>
                <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "#666", marginBottom: 8 }}>Notes</h3>
                <p style={{ fontSize: 13, color: "#A0A0A0", lineHeight: 1.6 }}>{previewInvoice.notes}</p>
              </div>
            )}

            {/* Upsell */}
            <div style={{ marginTop: 48, padding: 24, background: "linear-gradient(135deg, rgba(200,255,0,0.04), rgba(200,255,0,0.01))", border: "1px solid rgba(200,255,0,0.15)", borderRadius: 10, textAlign: "center" }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#C8FF00", marginBottom: 6 }}>Need more from your online presence?</p>
              <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>Stacked Marketing offers website design, performance advertising, SEO &amp; more.<br />Get in touch for a free consultation.</p>
              <p style={{ marginTop: 12, fontSize: 13 }}>
                <a href="https://www.stackedmarketing.co.za" style={{ color: "#C8FF00", textDecoration: "none", fontWeight: 600 }}>www.stackedmarketing.co.za</a>
                {" "}&middot;{" "}
                <a href="https://wa.me/27621779799" style={{ color: "#C8FF00", textDecoration: "none", fontWeight: 600 }}>WhatsApp Us</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── CREATE VIEW ── */

  if (view === "create") {
    return (
      <div style={S.page}>
        <div style={S.container}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700 }}>New Invoice</h1>
            <button onClick={() => { resetForm(); setView("list"); }} style={S.btnSecondary}>
              Cancel
            </button>
          </div>

          {error && (
            <div style={{ padding: "12px 16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, color: "#EF4444", fontSize: 13, marginBottom: 20 }}>
              {error}
            </div>
          )}

          <div ref={formRef}>
            {/* Client Details */}
            <div style={S.card}>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Client Details</h2>

              {savedClients.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <label style={S.label}>Load Saved Client</label>
                  <select
                    style={{ ...S.input, cursor: "pointer" }}
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value !== "") loadSavedClient(Number(e.target.value));
                      e.target.value = "";
                    }}
                  >
                    <option value="" disabled>Select a saved client...</option>
                    {savedClients.map((c, i) => (
                      <option key={i} value={i} style={{ background: "#141414", color: "#fff" }}>
                        {c.clientName}{c.clientBusiness ? ` — ${c.clientBusiness}` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={S.label}>Client Name *</label>
                  <input style={S.input} value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="John Doe" />
                </div>
                <div>
                  <label style={S.label}>Business Name</label>
                  <input style={S.input} value={clientBusiness} onChange={(e) => setClientBusiness(e.target.value)} placeholder="Acme Pty Ltd" />
                </div>
                <div>
                  <label style={S.label}>Email</label>
                  <input style={S.input} type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="john@example.com" />
                </div>
                <div>
                  <label style={S.label}>Phone / WhatsApp</label>
                  <input style={S.input} value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="+27 60 000 0000" />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div style={S.card}>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Line Items</h2>

              {/* Preset buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                {SERVICE_PRESETS.map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => addPresetItem(i)}
                    style={{
                      padding: "8px 14px",
                      background: i === SERVICE_PRESETS.length - 1 ? "rgba(255,255,255,0.05)" : "rgba(200,255,0,0.08)",
                      border: `1px solid ${i === SERVICE_PRESETS.length - 1 ? "rgba(255,255,255,0.12)" : "rgba(200,255,0,0.2)"}`,
                      borderRadius: 6,
                      color: i === SERVICE_PRESETS.length - 1 ? "#A0A0A0" : "#C8FF00",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>

              {/* Items list */}
              {items.length === 0 && (
                <p style={{ color: "#666", fontSize: 13, padding: "20px 0", textAlign: "center" }}>
                  No items yet. Click a service above or add a custom line item.
                </p>
              )}

              {items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: 16,
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.06)",
                    marginBottom: 12,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <label style={S.label}>Description</label>
                      <input
                        style={S.input}
                        value={item.description}
                        onChange={(e) => updateItem(i, "description", e.target.value)}
                        placeholder="Service name"
                      />
                    </div>
                    <div style={{ width: 160 }}>
                      <label style={S.label}>Amount (R)</label>
                      <input
                        style={S.input}
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.amount || ""}
                        onChange={(e) => updateItem(i, "amount", parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                      />
                    </div>
                    <button
                      onClick={() => removeItem(i)}
                      style={{ ...S.btnDanger, marginTop: 22 }}
                    >
                      Remove
                    </button>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <label style={S.label}>Detail / Description</label>
                    <textarea
                      style={S.textarea}
                      value={item.detail}
                      onChange={(e) => updateItem(i, "detail", e.target.value)}
                      placeholder="Detailed description of this line item..."
                    />
                  </div>
                </div>
              ))}

              {/* Running totals */}
              {items.length > 0 && (
                <div style={{ marginTop: 20, marginLeft: "auto", width: 280 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: 18, fontWeight: 700, borderTop: "2px solid rgba(255,255,255,0.15)", marginTop: 4 }}>
                    <span>Total</span><span style={{ color: "#C8FF00" }}>{formatCurrency(total)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Invoice Settings */}
            <div style={S.card}>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Invoice Settings</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={S.label}>Due Date</label>
                  <input style={S.input} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <label style={S.label}>Notes (optional)</label>
                <textarea
                  style={S.textarea}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes for this invoice..."
                />
              </div>
            </div>

            {/* Submit */}
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 }}>
              <button onClick={() => { resetForm(); setView("list"); }} style={S.btnSecondary}>
                Cancel
              </button>
              <button onClick={handleCreate} disabled={saving} style={{ ...S.btnPrimary, opacity: saving ? 0.6 : 1 }}>
                {saving ? "Creating..." : "Create Invoice"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── LIST VIEW ── */

  return (
    <div style={S.page}>
      <div style={S.container}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700 }}>Invoices</h1>
            <p style={{ color: "#A0A0A0", fontSize: 14, marginTop: 4 }}>Manage and track your invoices</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={handleLogout} style={S.btnSecondary}>Log Out</button>
            <button onClick={() => setView("create")} style={S.btnPrimary}>+ New Invoice</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
          <div style={S.card}>
            <p style={{ fontSize: 12, color: "#A0A0A0", textTransform: "uppercase", letterSpacing: 0.5 }}>Total Invoices</p>
            <p style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>{invoices.length}</p>
          </div>
          <div style={S.card}>
            <p style={{ fontSize: 12, color: "#A0A0A0", textTransform: "uppercase", letterSpacing: 0.5 }}>Outstanding</p>
            <p style={{ fontSize: 28, fontWeight: 700, marginTop: 4, color: "#EF4444" }}>{formatCurrency(totalOutstanding)}</p>
          </div>
          <div style={S.card}>
            <p style={{ fontSize: 12, color: "#A0A0A0", textTransform: "uppercase", letterSpacing: 0.5 }}>Received</p>
            <p style={{ fontSize: 28, fontWeight: 700, marginTop: 4, color: "#22C55E" }}>{formatCurrency(totalReceived)}</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {(["all", "unpaid", "paid"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 16px",
                borderRadius: 20,
                border: "1px solid",
                borderColor: filter === f ? "#C8FF00" : "rgba(255,255,255,0.1)",
                background: filter === f ? "rgba(200,255,0,0.1)" : "transparent",
                color: filter === f ? "#C8FF00" : "#A0A0A0",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
                textTransform: "capitalize",
              }}
            >
              {f} ({f === "all" ? invoices.length : invoices.filter((i) => i.status === f).length})
            </button>
          ))}
        </div>

        {/* Invoice List */}
        {filteredInvoices.length === 0 && (
          <div style={{ ...S.card, textAlign: "center", padding: 48, color: "#666" }}>
            <p style={{ fontSize: 15 }}>No invoices yet. Create your first one.</p>
          </div>
        )}

        {filteredInvoices.map((inv) => (
          <div key={inv.id} style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, fontWeight: 600, color: "#C8FF00" }}>{inv.invoiceNumber}</span>
                <span style={S.badge(inv.status)}>{inv.status}</span>
              </div>
              <p style={{ fontSize: 15, fontWeight: 600 }}>{inv.clientName}{inv.clientBusiness ? ` — ${inv.clientBusiness}` : ""}</p>
              <p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                {inv.items.map((i) => i.description).join(", ")} &middot; Created {formatDate(inv.createdAt)} &middot; Due {formatDate(inv.dueDate)}
                {inv.paidDate && <span style={{ color: "#22C55E" }}> &middot; Paid {formatDate(inv.paidDate)}</span>}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <p style={{ fontSize: 20, fontWeight: 700, whiteSpace: "nowrap" }}>{formatCurrency(inv.total)}</p>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => { setPreviewInvoice(inv); setView("preview"); }}
                  style={{ ...S.btnSecondary, padding: "6px 12px", fontSize: 12 }}
                >
                  View
                </button>
                <button
                  onClick={() => generateInvoicePDF(inv)}
                  style={{ ...S.btnSecondary, padding: "6px 12px", fontSize: 12 }}
                >
                  PDF
                </button>
                <button
                  onClick={() => toggleStatus(inv)}
                  style={{
                    padding: "6px 12px",
                    fontSize: 12,
                    borderRadius: 6,
                    border: "1px solid",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    background: inv.status === "unpaid" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                    borderColor: inv.status === "unpaid" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)",
                    color: inv.status === "unpaid" ? "#22C55E" : "#EF4444",
                  }}
                >
                  {inv.status === "unpaid" ? "Mark Paid" : "Mark Unpaid"}
                </button>
                <button onClick={() => handleDelete(inv)} style={S.btnDanger}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
