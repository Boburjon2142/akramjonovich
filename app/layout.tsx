import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akramjonovich.uz — AI, Web va Automation Product Studio",
  description:
    "Boburjon Akramjonovich — Python/Django full-stack developer, AI automation specialist va product engineer. Biznes, ta'lim va energetika uchun zamonaviy raqamli mahsulotlar.",
  keywords: [
    "Akramjonovich",
    "Python developer Qarshi",
    "Django developer",
    "AI automation",
    "Telegram bot",
    "web development Uzbekistan",
    "EduTech",
    "GreenTech",
    "full-stack developer",
    "product engineer",
  ],
  authors: [{ name: "Boburjon Akramjonovich" }],
  creator: "Boburjon Akramjonovich",
  metadataBase: new URL("https://akramjonovich.uz"),
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://akramjonovich.uz",
    title: "Akramjonovich.uz — AI, Web va Automation Product Studio",
    description:
      "Python/Django, AI automation va web development bo'yicha product engineer. Biznes, ta'lim va energetika uchun real raqamli mahsulotlar.",
    siteName: "Akramjonovich.uz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akramjonovich.uz",
    description: "AI, Web va Automation Product Studio — Qarshi, O'zbekiston",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased overflow-x-hidden"
        style={{ background: "var(--void)", color: "var(--text-primary)" }}
      >
        {children}
      </body>
    </html>
  );
}
