import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OK_MESSAGE = "¡Gracias! Te avisaremos de cada nuevo recurso.";

export async function POST(request: NextRequest) {
  let email = "";
  try {
    const body = (await request.json()) as { email?: string };
    email = (body?.email ?? "").trim();
  } catch {
    return NextResponse.json({ message: "Solicitud inválida." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { message: "Ingresa un correo válido." },
      { status: 422 },
    );
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  // Sin credenciales: no rompemos el flujo. Registramos y respondemos OK.
  // Conecta MailerLite definiendo MAILERLITE_API_KEY (y opcional _GROUP_ID).
  if (!apiKey) {
    console.info(`[suscribir] (MailerLite no configurado) nuevo correo: ${email}`);
    return NextResponse.json({ message: OK_MESSAGE });
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        ...(groupId ? { groups: [groupId] } : {}),
      }),
    });

    if (!res.ok) {
      console.error("[suscribir] MailerLite:", res.status, await res.text());
      return NextResponse.json(
        { message: "No pudimos suscribirte ahora. Intenta más tarde." },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: OK_MESSAGE });
  } catch (err) {
    console.error("[suscribir] error:", err);
    return NextResponse.json(
      { message: "No pudimos suscribirte ahora. Intenta más tarde." },
      { status: 502 },
    );
  }
}
