import type { Metadata } from "next";
import { getRequestCompany } from "./lib/companyServer";
import { Providers } from "./providers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getRequestCompany();

  return {
    title: company.metadataTitle,
    description: company.metadataDescription,
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [{ url: "/icon", type: "image/png" }],
      shortcut: [{ url: "/icon", type: "image/png" }],
      apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const company = await getRequestCompany();

  return (
    <html lang="en-US">
      <body>
        <Providers company={company}>{children}</Providers>
      </body>
    </html>
  );
}
