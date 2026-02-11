import { google } from "googleapis";

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest: string;
  budget?: string;
  message: string;
  source?: string;
  geo: { country: string; city: string; region: string };
  userAgent: string;
  referer: string;
  timestamp: string;
}

function getPrivateKey(): string {
  const raw = process.env.GOOGLE_PRIVATE_KEY || "";
  // Handle both escaped \\n (from .env files) and actual newlines (from Vercel)
  if (raw.includes("\\n")) {
    return raw.replace(/\\n/g, "\n");
  }
  return raw;
}

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: getPrivateKey(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendToGoogleSheets(data: LeadData) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    console.warn("Google Sheets not configured, skipping...");
    return;
  }

  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const interestLabels: Record<string, string> = {
    "agentic-ai": "Agentic AI Systems",
    "voice-ai": "Voice AI & Telephony",
    "content-automation": "Content Automation",
    "enterprise-automation": "Enterprise Automation",
    "ai-consulting": "AI Consulting",
    other: "Other",
    "from-blog": "Blog Inquiry",
    "homepage-cta": "Homepage CTA",
    "exit-intent": "Exit Intent",
  };

  const budgetLabels: Record<string, string> = {
    "under-5k": "Under $5K",
    "5k-15k": "$5K - $15K",
    "15k-50k": "$15K - $50K",
    "50k-plus": "$50K+",
    "not-sure": "Not Sure",
  };

  const row = [
    data.timestamp,
    data.name,
    data.email,
    data.phone || "",
    data.company || "",
    interestLabels[data.interest] || data.interest,
    budgetLabels[data.budget || ""] || data.budget || "",
    data.message,
    data.source || "contact-form",
    data.geo.country,
    data.geo.city,
    data.geo.region,
    data.userAgent,
    data.referer,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Leads!A:N",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}
