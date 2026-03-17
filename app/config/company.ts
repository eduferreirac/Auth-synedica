export type CompanyId = "synedica" | "blacklabs";

type CompanyConfig = {
  id: CompanyId;
  name: string;
  logoSrc: string;
  logoAlt: string;
  metadataTitle: string;
  metadataDescription: string;
  verificationTitle: string;
  verificationDescription: string;
  confirmButtonLabel: string;
  loadingInitialStatus: string;
  loadingPhrases: string[];
  verifiedBadge: string;
  resultTitle: string;
  logisticsTitle: string;
  securityTitle: string;
  footerLabel: string;
  logisticsSerial: string;
  logisticsExpiration: string;
  logisticsRegion: string;
};

export const companies: Record<CompanyId, CompanyConfig> = {
  synedica: {
    id: "synedica",
    name: "Synedica",
    logoSrc: "/synedica.svg",
    logoAlt: "Synedica logo",
    metadataTitle: "Global Authentication Service - Synedica",
    metadataDescription: "Global Authentication Service - Synedica",
    verificationTitle: "VERIFICATION",
    verificationDescription:
      "I certify that I have a valid medical prescription and confirm that the product was purchased through a licensed sales channel.",
    confirmButtonLabel: "CONFIRM AND VALIDATE",
    loadingInitialStatus: "Encrypting Tunnel...",
    loadingPhrases: ["Starting...", "Validating Batch...", "Checking IP...", "Generating Hash...", "Finishing..."],
    verifiedBadge: "SECURE ANALYTICS VERIFIED",
    resultTitle: "AUTHENTICITY CONFIRMED",
    logisticsTitle: "Logistics Trace",
    securityTitle: "Security Credentials",
    footerLabel: "ENCRYPTED VERIFICATION SYSTEM",
    logisticsSerial: "NHGP281",
    logisticsExpiration: "01/2027",
    logisticsRegion: "Brazil",
  },
  blacklabs: {
    id: "blacklabs",
    name: "Black Labs",
    logoSrc: "/black-labs-logo.svg",
    logoAlt: "Black Labs logo",
    metadataTitle: "Global Authentication Service - Black Labs",
    metadataDescription: "Global Authentication Service - Black Labs",
    verificationTitle: "VERIFICATION",
    verificationDescription:
      "I certify that I have a valid medical prescription and confirm that the product was purchased through a licensed sales channel.",
    confirmButtonLabel: "CONFIRM AND VALIDATE",
    loadingInitialStatus: "Encrypting Tunnel...",
    loadingPhrases: ["Starting...", "Validating Batch...", "Checking IP...", "Generating Hash...", "Finishing..."],
    verifiedBadge: "SECURE ANALYTICS VERIFIED",
    resultTitle: "AUTHENTICITY CONFIRMED",
    logisticsTitle: "Logistics Trace",
    securityTitle: "Security Credentials",
    footerLabel: "ENCRYPTED VERIFICATION SYSTEM",
    logisticsSerial: "BKLP427",
    logisticsExpiration: "11/2027",
    logisticsRegion: "Brazil",
  },
};

const companyIds = Object.keys(companies) as CompanyId[];

export const defaultCompanyId = companyIds[0];

export function getCompanyConfig(companyValue?: string | null) {
  const normalized = companyValue?.trim().toLowerCase() as CompanyId | undefined;

  if (normalized && normalized in companies) {
    return companies[normalized];
  }

  return companies[defaultCompanyId];
}

export const activeCompany = getCompanyConfig(process.env.NEXT_PUBLIC_COMPANY);
