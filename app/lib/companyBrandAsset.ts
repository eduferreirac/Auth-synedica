import { readFile } from "node:fs/promises";
import path from "node:path";
import type { CompanyConfig } from "../config/company";

function getMimeType(filePath: string) {
  if (filePath.endsWith(".svg")) {
    return "image/svg+xml";
  }

  if (filePath.endsWith(".png")) {
    return "image/png";
  }

  return "application/octet-stream";
}

export async function getCompanyLogoDataUrl(company: CompanyConfig) {
  const logoPath = path.join(process.cwd(), "public", company.logoSrc.replace(/^\//, ""));
  const logoBuffer = await readFile(logoPath);
  const mimeType = getMimeType(logoPath);

  return `data:${mimeType};base64,${logoBuffer.toString("base64")}`;
}
