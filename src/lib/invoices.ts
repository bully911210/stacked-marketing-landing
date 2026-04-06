import { put, list, del } from "@vercel/blob";

const PREFIX = "invoices/";
const COUNTER_KEY = "invoices/_counter.json";

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

async function findBlob(pathname: string) {
  const { blobs } = await list({ prefix: pathname });
  return blobs.find((b) => b.pathname === pathname) ?? null;
}

async function downloadBlobJson(downloadUrl: string): Promise<unknown> {
  const res = await fetch(downloadUrl);
  return res.json();
}

async function getNextNumber(): Promise<string> {
  let counter = 1;
  try {
    const blob = await findBlob(COUNTER_KEY);
    if (blob) {
      const data = (await downloadBlobJson(blob.downloadUrl)) as { counter?: number };
      counter = (data.counter || 0) + 1;
    }
  } catch {
    // First invoice — counter starts at 1
  }
  await put(COUNTER_KEY, JSON.stringify({ counter }), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });
  return `SM-${String(counter).padStart(4, "0")}`;
}

export async function getAllInvoices(): Promise<Invoice[]> {
  const { blobs } = await list({ prefix: PREFIX });

  const invoices: Invoice[] = [];
  for (const blob of blobs) {
    if (blob.pathname === COUNTER_KEY) continue;
    try {
      const invoice = (await downloadBlobJson(blob.downloadUrl)) as Invoice;
      invoices.push(invoice);
    } catch {
      console.error(`Skipping corrupted invoice blob: ${blob.pathname}`);
    }
  }

  return invoices.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getInvoiceById(id: string): Promise<Invoice | null> {
  try {
    const blob = await findBlob(`${PREFIX}${id}.json`);
    if (!blob) return null;
    return (await downloadBlobJson(blob.downloadUrl)) as Invoice;
  } catch {
    return null;
  }
}

export async function createInvoice(
  data: Omit<Invoice, "id" | "invoiceNumber" | "subtotal" | "vat" | "total" | "status" | "paidDate" | "createdAt">
): Promise<Invoice> {
  const invoiceNumber = await getNextNumber();
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

  await put(`${PREFIX}${id}.json`, JSON.stringify(invoice, null, 2), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });

  return invoice;
}

export async function updateInvoiceStatus(
  id: string,
  status: "paid" | "unpaid"
): Promise<Invoice | null> {
  const invoice = await getInvoiceById(id);
  if (!invoice) return null;

  invoice.status = status;
  invoice.paidDate = status === "paid" ? new Date().toISOString() : null;

  await put(`${PREFIX}${id}.json`, JSON.stringify(invoice, null, 2), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });

  return invoice;
}

export async function deleteInvoice(id: string): Promise<boolean> {
  try {
    const blob = await findBlob(`${PREFIX}${id}.json`);
    if (!blob) return false;
    await del(blob.url);
    return true;
  } catch {
    return false;
  }
}
