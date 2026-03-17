import type { Metadata } from "next";
import { activeCompany } from "./config/company";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: activeCompany.metadataTitle,
  description: activeCompany.metadataDescription,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    shortcut: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
