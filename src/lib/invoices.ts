import { put, list, del } from "@vercel/blob";

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

async function getNextNumber(): Promise<string> {
  let counter = 1;
  try {
    const { blobs } = await list({ prefix: "invoices/_counter.json" });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url);
      const data = await res.json();
      counter = (data.counter || 0) + 1;
    }
  } catch {
    // First invoice — counter starts at 1
  }
  await put("invoices/_counter.json", JSON.stringify({ counter }), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
  return `SM-${String(counter).padStart(4, "0")}`;
}

export async function getAllInvoices(): Promise<Invoice[]> {
  const invoices: Invoice[] = [];
  let cursor: string | undefined;

  do {
    const result = await list({
      prefix: "invoices/",
      ...(cursor ? { cursor } : {}),
    });

    const invoiceBlobs = result.blobs.filter(
      (b) => b.pathname.endsWith(".json") && !b.pathname.includes("_counter")
    );

    const fetched = await Promise.all(
      invoiceBlobs.map(async (blob) => {
        try {
          const res = await fetch(blob.url);
          return (await res.json()) as Invoice;
        } catch {
          console.error(`Skipping corrupted invoice blob: ${blob.pathname}`);
          return null;
        }
      })
    );

    invoices.push(...fetched.filter((inv): inv is Invoice => inv !== null));
    cursor = result.hasMore ? result.cursor : undefined;
  } while (cursor);

  return invoices.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getInvoiceById(id: string): Promise<Invoice | null> {
  try {
    const { blobs } = await list({ prefix: `invoices/${id}.json` });
    if (blobs.length === 0) return null;
    const res = await fetch(blobs[0].url);
    return (await res.json()) as Invoice;
  } catch {
    return null;
  }
}

export async function createInvoice(
  data: Omit<
    Invoice,
    | "id"
    | "invoiceNumber"
    | "subtotal"
    | "vat"
    | "total"
    | "status"
    | "paidDate"
    | "createdAt"
  >
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

  await put(
    `invoices/${id}.json`,
    JSON.stringify(invoice, null, 2),
    {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    }
  );

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

  await put(
    `invoices/${id}.json`,
    JSON.stringify(invoice, null, 2),
    {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    }
  );

  return invoice;
}

export async function deleteInvoice(id: string): Promise<boolean> {
  try {
    const { blobs } = await list({ prefix: `invoices/${id}.json` });
    if (blobs.length === 0) return false;
    await del(blobs[0].url);
    return true;
  } catch {
    return false;
  }
}
