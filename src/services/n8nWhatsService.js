const logger = require("../utils/logger");

async function sendWhatsViaN8n({ to, text }) {
  const url = process.env.N8N_WEBHOOK_URL;
  const token = process.env.N8N_WEBHOOK_TOKEN;

  if (!url) throw new Error("N8N_WEBHOOK_URL não definido no .env");
  if (!token) throw new Error("N8N_WEBHOOK_TOKEN não definido no .env");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-cristo-token": token
    },
    body: JSON.stringify({ to, text })
  });

  // n8n pode responder JSON ou texto; tentamos ler ambos
  const contentType = res.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await res.json().catch(() => ({}))
    : await res.text().catch(() => "");

  if (!res.ok) {
    logger.error("Webhook n8n retornou erro:", { status: res.status, body });
    throw new Error(`n8n webhook error ${res.status}`);
  }

  return body;
}

module.exports = { sendWhatsViaN8n };
