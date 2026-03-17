import { readFile } from "node:fs/promises";
import path from "node:path";
import { activeCompany } from "../config/company";

function getMimeType(filePath: string) {
  if (filePath.endsWith(".svg")) {
    return "image/svg+xml";
  }

  if (filePath.endsWith(".png")) {
    return "image/png";
  }

  return "application/octet-stream";
}

export async function getActiveCompanyLogoDataUrl() {
  const logoPath = path.join(process.cwd(), "public", activeCompany.logoSrc.replace(/^\//, ""));
  const logoBuffer = await readFile(logoPath);
  const mimeType = getMimeType(logoPath);

  return `data:${mimeType};base64,${logoBuffer.toString("base64")}`;
}
