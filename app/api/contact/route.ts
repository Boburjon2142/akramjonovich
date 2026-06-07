import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  contact?: string;
  projectType?: string;
  budget?: string;
  message?: string;
};

const clip = (value: string, max = 1200) =>
  value.length > max ? `${value.slice(0, max)}...` : value;

const clean = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json(
      { error: "Telegram sozlamalari topilmadi." },
      { status: 500 }
    );
  }

  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Yuborilgan ma'lumot formati noto'g'ri." },
      { status: 400 }
    );
  }

  const name = clean(payload.name);
  const contact = clean(payload.contact);
  const projectType = clean(payload.projectType) || "Tanlanmagan";
  const budget = clean(payload.budget) || "Tanlanmagan";
  const message = clean(payload.message);

  if (!name || !contact || !message) {
    return NextResponse.json(
      { error: "Ism, aloqa va loyiha haqida maydonlari majburiy." },
      { status: 400 }
    );
  }

  const text = [
    "Yangi loyiha so'rovi",
    "",
    `Ism: ${clip(name, 120)}`,
    `Aloqa: ${clip(contact, 160)}`,
    `Loyiha turi: ${clip(projectType, 120)}`,
    `Budjet: ${clip(budget, 80)}`,
    "",
    "Loyiha haqida:",
    clip(message),
  ].join("\n");

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    }
  );

  if (!telegramResponse.ok) {
    return NextResponse.json(
      { error: "Telegramga yuborishda xatolik yuz berdi." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
