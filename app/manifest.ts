import type { MetadataRoute } from "next";
import { activeCompany } from "./config/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: activeCompany.metadataTitle,
    short_name: activeCompany.name,
    description: activeCompany.metadataDescription,
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
