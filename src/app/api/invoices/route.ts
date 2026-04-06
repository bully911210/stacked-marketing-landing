import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllInvoices, createInvoice } from "@/lib/invoices";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const invoices = getAllInvoices();
    return NextResponse.json(invoices);
  } catch (err) {
    console.error("Failed to load invoices:", err);
    return NextResponse.json({ error: "Failed to load invoices" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.clientName || !body.items?.length) {
      return NextResponse.json(
        { error: "Client name and at least one line item required" },
        { status: 400 }
      );
    }

    const invoice = createInvoice({
      clientName: body.clientName,
      clientEmail: body.clientEmail ?? "",
      clientPhone: body.clientPhone ?? "",
      clientBusiness: body.clientBusiness ?? "",
      items: body.items,
      dueDate: body.dueDate ?? new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      notes: body.notes ?? "",
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (err) {
    console.error("Failed to create invoice:", err);
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }
}
