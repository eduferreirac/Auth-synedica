import { headers } from "next/headers";
import { getCompanyConfigByHost } from "../config/company";

export async function getRequestCompany() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");

  return getCompanyConfigByHost(host);
}
