interface LeadEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest: string;
  budget?: string;
  message: string;
  source?: string;
  geo: { country: string; city: string; region: string };
  timestamp: string;
}

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

export async function sendLeadNotification(data: LeadEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("Resend API key not configured, skipping email...");
    return;
  }

  const date = new Date(data.timestamp).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #e5e5e5; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); padding: 24px 32px;">
        <h1 style="margin: 0; font-size: 20px; color: white;">New Lead from ahmadbukhari.com</h1>
        <p style="margin: 4px 0 0; font-size: 13px; color: rgba(255,255,255,0.7);">${date}</p>
      </div>

      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #a78bfa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; width: 120px; vertical-align: top;">Name</td>
            <td style="padding: 10px 0; color: #f5f5f5; font-size: 15px;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a78bfa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Email</td>
            <td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #818cf8; text-decoration: none;">${data.email}</a></td>
          </tr>
          ${data.phone ? `<tr><td style="padding: 10px 0; color: #a78bfa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Phone</td><td style="padding: 10px 0; color: #f5f5f5;">${data.phone}</td></tr>` : ""}
          ${data.company ? `<tr><td style="padding: 10px 0; color: #a78bfa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Company</td><td style="padding: 10px 0; color: #f5f5f5;">${data.company}</td></tr>` : ""}
          <tr>
            <td style="padding: 10px 0; color: #a78bfa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Interest</td>
            <td style="padding: 10px 0; color: #f5f5f5;">${interestLabels[data.interest] || data.interest}</td>
          </tr>
          ${data.budget ? `<tr><td style="padding: 10px 0; color: #a78bfa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Budget</td><td style="padding: 10px 0; color: #f5f5f5;">${budgetLabels[data.budget] || data.budget}</td></tr>` : ""}
          <tr>
            <td style="padding: 10px 0; color: #a78bfa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Location</td>
            <td style="padding: 10px 0; color: #f5f5f5;">${data.geo.city}, ${data.geo.region}, ${data.geo.country}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #a78bfa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Source</td>
            <td style="padding: 10px 0; color: #f5f5f5;">${data.source || "Contact Form"}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid #7c3aed;">
          <p style="margin: 0 0 4px; color: #a78bfa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
          <p style="margin: 0; color: #d4d4d4; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>

        <div style="margin-top: 28px; text-align: center;">
          <a href="mailto:${data.email}?subject=Re: Your inquiry on ahmadbukhari.com" style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Reply to ${data.name}</a>
        </div>
      </div>
    </div>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio Leads <onboarding@resend.dev>",
      to: "ahmadbukhari4245@gmail.com",
      subject: `New Lead: ${data.name} - ${interestLabels[data.interest] || data.interest}`,
      html,
    }),
  });
}
