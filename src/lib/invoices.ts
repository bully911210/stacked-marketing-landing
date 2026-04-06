import fs from "fs";
import path from "path";

const INVOICES_DIR = path.join(process.cwd(), "content/invoices");
const COUNTER_FILE = path.join(INVOICES_DIR, "_counter.json");

export interface InvoiceLineItem {
  description: string;
  detail: string;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientBusiness: string;
  items: InvoiceLineItem[];
  subtotal: number;
  vat: number;
  total: number;
  status: "unpaid" | "paid";
  paidDate: string | null;
  createdAt: string;
  dueDate: string;
  notes: string;
}

function ensureDir() {
  if (!fs.existsSync(INVOICES_DIR)) {
    fs.mkdirSync(INVOICES_DIR, { recursive: true });
  }
}

function getNextNumber(): string {
  ensureDir();
  let counter = 1;
  if (fs.existsSync(COUNTER_FILE)) {
    const data = JSON.parse(fs.readFileSync(COUNTER_FILE, "utf-8"));
    counter = (data.counter || 0) + 1;
  }
  fs.writeFileSync(COUNTER_FILE, JSON.stringify({ counter }));
  return `SM-${String(counter).padStart(4, "0")}`;
}

export function getAllInvoices(): Invoice[] {
  ensureDir();
  const files = fs
    .readdirSync(INVOICES_DIR)
    .filter((f) => f.endsWith(".json") && !f.startsWith("_"));

  const invoices = files.map((file) => {
    const raw = fs.readFileSync(path.join(INVOICES_DIR, file), "utf-8");
    return JSON.parse(raw) as Invoice;
  });

  return invoices.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getInvoiceById(id: string): Invoice | null {
  ensureDir();
  const filePath = path.join(INVOICES_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function createInvoice(
  data: Omit<Invoice, "id" | "invoiceNumber" | "subtotal" | "vat" | "total" | "status" | "paidDate" | "createdAt">
): Invoice {
  ensureDir();
  const invoiceNumber = getNextNumber();
  const id = invoiceNumber.toLowerCase().replace("sm-", "inv-");

  const subtotal = data.items.reduce((sum, item) => sum + item.amount, 0);
  const vat = 0;
  const total = subtotal;

  const invoice: Invoice = {
    id,
    invoiceNumber,
    clientName: data.clientName,
    clientEmail: data.clientEmail,
    clientPhone: data.clientPhone,
    clientBusiness: data.clientBusiness,
    items: data.items,
    subtotal,
    vat,
    total,
    status: "unpaid",
    paidDate: null,
    createdAt: new Date().toISOString(),
    dueDate: data.dueDate,
    notes: data.notes,
  };

  fs.writeFileSync(
    path.join(INVOICES_DIR, `${id}.json`),
    JSON.stringify(invoice, null, 2)
  );

  return invoice;
}

export function updateInvoiceStatus(
  id: string,
  status: "paid" | "unpaid"
): Invoice | null {
  const invoice = getInvoiceById(id);
  if (!invoice) return null;

  invoice.status = status;
  invoice.paidDate = status === "paid" ? new Date().toISOString() : null;

  fs.writeFileSync(
    path.join(INVOICES_DIR, `${id}.json`),
    JSON.stringify(invoice, null, 2)
  );

  return invoice;
}

export function deleteInvoice(id: string): boolean {
  const filePath = path.join(INVOICES_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) return false;
  fs.unlinkSync(filePath);
  return true;
}
