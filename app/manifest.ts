import type { MetadataRoute } from "next";
import { getRequestCompany } from "./lib/companyServer";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const company = await getRequestCompany();

  return {
    name: company.metadataTitle,
    short_name: company.name,
    description: company.metadataDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/icons/192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/512",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
