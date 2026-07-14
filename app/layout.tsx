import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import LogoLoader from "@/components/LogoLoader";
import { site } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ekizyazilim.com",
  ),
  title: {
    default: `${site.name} | Denizli web & e-ticaret`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} | Denizli web & e-ticaret`,
    description: site.description,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/logo/logo_lightwtext.png",
        width: 2000,
        height: 2000,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: site.name,
    description: site.description,
  },
  icons: {
    icon: [{ url: "/logo/logo_dark.png", type: "image/png" }],
    apple: [{ url: "/logo/logo_dark.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full max-w-[100%] overflow-x-clip font-sans text-foreground bg-background">
        <LogoLoader>{children}</LogoLoader>
      </body>
    </html>
  );
}
