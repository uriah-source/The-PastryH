// ─── EmailJS Integration ───────────────────────────────────────────────────
//
// Setup instructions:
//  1. Create a free account at https://www.emailjs.com
//  2. Add an Email Service (Gmail, Outlook, etc.) and copy the Service ID
//  3. Create TWO email templates (see template variable reference below)
//     - Template A: admin notification   → copy its Template ID
//     - Template B: customer confirmation → copy its Template ID
//  4. Copy your Public Key from Account → API Keys
//  5. Replace the four placeholder strings below with your real values
//
// Template variable reference (use these exact names in your EmailJS templates):
//   {{order_number}}    – e.g. PH-ABC123
//   {{customer_name}}   – full name
//   {{customer_email}}  – email address
//   {{customer_phone}}  – phone number
//   {{delivery_address}}
//   {{special_instructions}}
//   {{delivery_method}}
//   {{delivery_fee}}
//   {{payment_method}}
//   {{items_list}}      – plain-text list of items
//   {{subtotal}}
//   {{tax}}
//   {{total}}
//   {{estimated_delivery}}
//   {{to_email}}        – recipient (admin template only)
// ─────────────────────────────────────────────────────────────────────────────

export const EMAILJS_CONFIG = {
  serviceId: "service_fd5awfc",
  adminTemplateId: "template_tl8xmlh",
  customerTemplateId: "template_fv276ov",
  publicKey: "17BmKfSUwuBgfQCNZ",
} as const;

// The two admin addresses that always receive order notifications
export const ADMIN_EMAILS = [
  "aparajoshua@gmail.com",
  "Otepolaoreoluwa032@gmail.com",
] as const;

export interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  specialInstructions?: string;
  deliveryMethod: string;
  deliveryFee: number;
  paymentMethod: string;
  items: { name: string; qty: number; unitPrice: number; lineTotal: number }[];
  subtotal: number;
  tax: number;
  total: number;
  estimatedDelivery: string;
}

function buildTemplateParams(data: OrderEmailData, toEmail: string) {
  const itemsList = data.items
    .map((i) => `${i.qty} × ${i.name}  ($${i.unitPrice.toFixed(2)} each) = $${i.lineTotal.toFixed(2)}`)
    .join("\n");

  return {
    to_email: toEmail,
    order_number: data.orderId,
    customer_name: data.customerName,
    customer_email: data.customerEmail,
    customer_phone: data.customerPhone,
    delivery_address: data.deliveryAddress,
    special_instructions: data.specialInstructions || "None",
    delivery_method: data.deliveryMethod,
    delivery_fee: `$${data.deliveryFee.toFixed(2)}`,
    payment_method: data.paymentMethod,
    items_list: itemsList,
    subtotal: `$${data.subtotal.toFixed(2)}`,
    tax: `$${data.tax.toFixed(2)}`,
    total: `$${data.total.toFixed(2)}`,
    estimated_delivery: data.estimatedDelivery,
  };
}

async function sendEmail(templateId: string, params: Record<string, string>) {
  const { serviceId, publicKey } = EMAILJS_CONFIG;

  const payload = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: params,
  };

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`EmailJS error ${res.status}: ${text}`);
  }
}

/**
 * Sends all order emails:
 *   • One notification to each admin address
 *   • One confirmation to the customer (if they provided an email)
 *
 * Failures are caught and logged so a failed email never blocks the order flow.
 */
export async function sendOrderEmails(data: OrderEmailData): Promise<void> {
  const { adminTemplateId, customerTemplateId } = EMAILJS_CONFIG;

  const adminSends = ADMIN_EMAILS.map((email) =>
    sendEmail(adminTemplateId, buildTemplateParams(data, email)).catch((err) =>
      console.error(`[EmailJS] Failed to notify ${email}:`, err)
    )
  );

  const customerSend =
    data.customerEmail
      ? sendEmail(customerTemplateId, buildTemplateParams(data, data.customerEmail)).catch((err) =>
          console.error("[EmailJS] Failed to send customer confirmation:", err)
        )
      : Promise.resolve();

  await Promise.all([...adminSends, customerSend]);
}
